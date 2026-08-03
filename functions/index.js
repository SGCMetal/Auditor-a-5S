import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import OpenAI from "openai";

initializeApp();
const openaiApiKey = defineSecret("OPENAI_API_KEY");
const MAX_IMAGES = 30;

function setCors(response) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.set("Access-Control-Allow-Methods", "POST, OPTIONS");
}

async function verifyFirebaseSession(request) {
  const header = request.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Error("missing-auth");
  return getAuth().verifyIdToken(match[1]);
}

function validImage(value) {
  return typeof value === "string" && /^data:image\/(jpeg|jpg|png|webp);base64,/i.test(value);
}

function responseSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: ["generalSummary", "suggestions"],
    properties: {
      generalSummary: { type: "string" },
      suggestions: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["questionId", "finding", "relatedQuestionIds", "suggestions"],
          properties: {
            questionId: { type: "integer", minimum: 1, maximum: 10 },
            finding: { type: "string" },
            relatedQuestionIds: {
              type: "array",
              items: { type: "integer", minimum: 1, maximum: 10 }
            },
            suggestions: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      }
    }
  };
}

export const analyze5SEvidence = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 180,
    memory: "1GiB",
    secrets: [openaiApiKey]
  },
  async (request, response) => {
    setCors(response);
    if (request.method === "OPTIONS") return response.status(204).send("");
    if (request.method !== "POST") return response.status(405).json({ error: "Método no permitido" });

    try {
      await verifyFirebaseSession(request);
    } catch (error) {
      console.warn("Sesión Firebase no válida", error.message);
      return response.status(401).json({ error: "Sesión no autorizada" });
    }

    try {
      const { area, answers, general } = request.body || {};
      if (!area?.full || !Array.isArray(answers)) return response.status(400).json({ error: "Solicitud incompleta" });

      const client = new OpenAI({ apiKey: openaiApiKey.value() });
      let imageCount = 0;
      const content = [
        {
          type: "input_text",
          text: `Actúa como apoyo visual para una auditoría semanal 5S de Metal Plating y Servicios. Área evaluada: ${area.full}.

Reglas obligatorias:
- Describe únicamente condiciones realmente visibles en las fotografías o expresadas por el auditor.
- Usa lenguaje prudente: "se observa", "parece", "no se alcanza a confirmar".
- No cambies ni contradigas la calificación oficial elegida por el auditor.
- Relaciona un hallazgo con otras preguntas 5S solo cuando exista una conexión clara.
- Propón recomendaciones concretas, breves y viables para mejorar en la siguiente revisión.
- No asignes responsables, no establezcas sanciones y no conviertas las sugerencias en acciones correctivas formales.
- Incluye también fortalezas cuando la evidencia muestre una buena condición.
- Si la fotografía no permite confirmar algo, dilo y evita inventarlo.`
        }
      ];

      const generalImages = Array.isArray(general?.images) ? general.images.filter(validImage).slice(0, 5) : [];
      if (general?.observation || generalImages.length) {
        content.push({
          type: "input_text",
          text: `VISTA GENERAL DEL ÁREA\nComentario del auditor: ${general?.observation || "Sin comentario general"}\nResume la condición global solamente con base en estas vistas.`
        });
        for (const image of generalImages) {
          if (imageCount >= MAX_IMAGES) break;
          content.push({ type: "input_image", image_url: image, detail: "auto" });
          imageCount += 1;
        }
      }

      const orderedAnswers = [...answers].sort((a, b) => Number(a.score || 5) - Number(b.score || 5) || Number(a.questionId) - Number(b.questionId));
      for (const answer of orderedAnswers) {
        const images = Array.isArray(answer.images) ? answer.images.filter(validImage).slice(0, 5) : [];
        if (!images.length && !answer.observation) continue;
        content.push({
          type: "input_text",
          text: `PREGUNTA ${answer.questionId}: ${answer.title}\n${answer.question}\nCalificación oficial confirmada: ${answer.score}/5.\nCriterio aplicado: ${answer.selectedCriterion}\nObservación del auditor: ${answer.observation || "Sin observación escrita"}`
        });
        for (const image of images) {
          if (imageCount >= MAX_IMAGES) break;
          content.push({ type: "input_image", image_url: image, detail: "auto" });
          imageCount += 1;
        }
        if (imageCount >= MAX_IMAGES) break;
      }

      if (imageCount === 0 && !answers.some((answer) => answer.observation) && !general?.observation) {
        return response.status(400).json({ error: "No hay evidencia suficiente para analizar" });
      }

      const aiResponse = await client.responses.create({
        model: process.env.OPENAI_MODEL || "gpt-5",
        store: false,
        input: [{ role: "user", content }],
        text: {
          format: {
            type: "json_schema",
            name: "mps_5s_visual_feedback",
            strict: true,
            schema: responseSchema()
          }
        }
      });

      const parsed = JSON.parse(aiResponse.output_text);
      return response.status(200).json({
        generalSummary: parsed.generalSummary || "",
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
        imagesAnalyzed: imageCount
      });
    } catch (error) {
      console.error("Análisis 5S", error);
      return response.status(500).json({ error: "No fue posible analizar las evidencias" });
    }
  }
);
