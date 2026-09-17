# App Auditoría 5S MPS — v1.6

## Cambios principales
- El QR general abre un tablero semanal con resultados por área, meta de 80%, promedio, áreas en meta y áreas críticas.
- Cada fila del tablero abre la evidencia del área: 10 preguntas, fotos, comentarios y recomendaciones.
- Se agregó un **Libro de trabajo 5S** por área. Las tareas se generan a partir del plan de mejora y los responsables pueden marcarlas como realizadas sin alterar la calificación vigente.
- El Recorrido Visual muestra el resultado más reciente y la semana anterior, incluyendo la diferencia en puntos.
- El Historial ahora incluye **Tableros semanales** reconstruidos desde las auditorías almacenadas.
- El QR general sigue siendo fijo: no es necesario cambiarlo cada semana.

## Antes de subir a GitHub
1. En Firebase > Firestore Database > Rules, reemplaza las reglas por el archivo `firestore.rules` de esta versión y pulsa **Publicar**.
2. Sustituye en GitHub los archivos de la versión anterior por los de esta carpeta.
3. Haz Commit changes y espera a que GitHub Pages se actualice.
4. Cierra y vuelve a abrir la app instalada para recibir la nueva caché.

## Importante
Las auditorías ya existentes no se borran. Para que el tablero QR muestre correctamente resultado anterior y libro de trabajo, vuelve a abrir y publicar la auditoría más reciente de cada área una sola vez. Las nuevas auditorías ya guardarán esos datos automáticamente.
