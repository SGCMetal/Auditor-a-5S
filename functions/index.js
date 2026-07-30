import { onRequest } from "firebase-functions/v2/https";
import OpenAI from "openai";

function setCors(response) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.set("Access-Control-Allow-Methods", "POST, OPTIONS");
}

function stripCodeFence(text) {
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

export const analyze5SEvidence = onRequest(
  { region: "us-central1", timeoutSeconds: 120, memory: "1GiB", secrets: ["OPENAI_API_KEY"] },
  async (request, response) => {
    setCors(response);
    if (request.method === "OPTIONS") return response.status(204).send("");
    if (request.method !== "POST") return response.status(405).json({ error: "Método no permitido" });

    try {
      const { area, answers } = request.body || {};
      if (!area?.full || !Array.isArray(answers)) return response.status(400).json({ error: "Solicitud incompleta" });

      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const content = [
        {
          type: "input_text",
          text: `Actúa como apoyo de auditoría 5S para Metal Plating y Servicios. Analiza solamente lo visible en las fotografías y combina esa evidencia con la observación y la calificación confirmada por el auditor. No cambies la calificación oficial. Genera retroalimentación positiva, concreta y viable para que el área mejore en la siguiente revisión. No conviertas las recomendaciones en acciones correctivas formales ni asignes responsables. Área: ${area.full}.\n\nDevuelve exclusivamente JSON válido con esta forma: {"suggestions":[{"questionId":1,"finding":"descripción breve y prudente","suggestions":["acción 1","acción 2"]}]}. Incluye solamente preguntas con evidencia u observación suficiente. Evita afirmar detalles que no sean visibles.`
        }
      ];

      for (const answer of answers) {
        content.push({
          type: "input_text",
          text: `Pregunta ${answer.questionId}: ${answer.title}. ${answer.question}\nCalificación confirmada: ${answer.score}/5. Criterio seleccionado: ${answer.selectedCriterion}\nObservación del auditor: ${answer.observation || "Sin observación escrita"}`
        });
        for (const image of (answer.images || []).slice(0, 2)) {
          if (typeof image === "string" && image.startsWith("data:image/")) {
            content.push({ type: "input_image", image_url: image, detail: "auto" });
          }
        }
      }

      const aiResponse = await client.responses.create({
        model: process.env.OPENAI_MODEL || "gpt-5",
        input: [{ role: "user", content }]
      });

      const parsed = JSON.parse(stripCodeFence(aiResponse.output_text));
      return response.status(200).json({ suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [] });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "No fue posible analizar las evidencias" });
    }
  }
);
