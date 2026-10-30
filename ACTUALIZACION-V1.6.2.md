# Auditoría 5S MPS · v1.6.2

## Cambios principales

- **Editar auditorías terminadas:** desde el detalle aparece `Editar auditoría`. Se conservan fecha, folio y área; no se crea una auditoría duplicada.
- **Corregir calificaciones y comentarios:** al editar se recorren nuevamente las 10 preguntas con los datos previamente capturados.
- **Reemplazar fotografías:** cada miniatura muestra `↻` para sustituirla y `×` para eliminarla. El reemplazo conserva la posición de la evidencia.
- **Actualización del QR:** si una auditoría ya publicada se corrige y hay conexión, la app intenta actualizar automáticamente el portal público. Si no puede, muestra un aviso para `Actualizar portal QR`.
- **Continuar donde se quedó:** el borrador se guarda después de cada calificación, comentario, fotografía y cambio de pantalla, además de un autoguardado de seguridad cada 4 segundos.
- **Cierre accidental:** al volver a abrir la app aparece `Continuar auditoría pendiente` indicando el área y la pregunta donde se quedó.
- **Fotos públicas corregidas:** las publicaciones nuevas guardan la lista de fotografías activas para que una foto eliminada/reemplazada no vuelva a aparecer en el portal del QR.

## Firebase

No se requieren cambios en las Rules respecto a v1.6.1 para estas funciones.
