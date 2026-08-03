# App Auditoría 5S MPS — versión 1.4

PWA para recorridos semanales 5S de Metal Plating y Servicios.

## Novedades de esta versión

- Hasta 5 fotografías por cada pregunta.
- Hasta 5 fotografías generales del área.
- Paso independiente de evidencia general al terminar las 10 preguntas.
- Análisis visual automático al final del recorrido cuando se conecta la función segura de IA.
- La IA describe únicamente lo visible, relaciona hallazgos con los criterios y sugiere mejoras; nunca cambia la calificación oficial.
- Recomendaciones editables u ocultables antes de guardar.
- Publicación de evidencias por auditoría.
- Generación y descarga de un QR semanal.
- Portal de evidencias para responsables, sin acceso a las pantallas administrativas desde el QR.
- Comparación de fotografías generales con la auditoría anterior cuando ambas fueron publicadas.
- Envío opcional de comentario o hasta 3 fotografías de mejora.
- Evidencias de mejora visibles en el detalle interno como “Pendiente de revisión”.
- Exportación de Excel con resumen, detalle, plan de mejora y enlaces QR.

## Flujo de uso

1. La auditora selecciona el área.
2. Evalúa las 10 preguntas y puede tomar hasta 5 fotos en cada una.
3. Agrega, si lo desea, fotografías generales del área.
4. La app genera el resultado y el plan de mejora.
5. Si la función de IA está activa, las imágenes se analizan al final.
6. La auditora revisa, edita u oculta recomendaciones.
7. Guarda y sincroniza la auditoría.
8. Desde el detalle, pulsa **Publicar y generar QR**.
9. Descarga el QR y lo coloca en el tablero semanal.
10. El responsable escanea el QR y consulta la evidencia y las recomendaciones.
11. Opcionalmente, el área comparte una evidencia de mejora.

## Puesta en producción

Lee `ACTUALIZACION-V1.4.md` y realiza los pasos en orden. Es indispensable publicar las nuevas reglas de Firestore antes de usar el portal QR.

## Análisis visual

El proyecto incluye una función segura en `functions/index.js`. La clave de OpenAI no se coloca en GitHub ni en `config.js`; se almacena como secreto de Firebase Functions. El análisis visual permanecerá desactivado mientras `AI_ENDPOINT` esté vacío.

## Aviso de acceso

El QR abre una interfaz limitada a las evidencias de una auditoría. La aplicación interna continúa usando sesiones anónimas, como se acordó para esta etapa. Esto es práctico para uso interno, pero no equivale a un control de acceso fuerte. Para impedir técnicamente que alguien con conocimientos manipule la dirección y llegue al panel interno, será necesario agregar un PIN interno o cuentas con roles.
