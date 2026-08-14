# App Auditoría 5S MPS — v1.5

Aplicación web/PWA para auditorías semanales 5S de Metal Plating y Servicios.

## Novedades de v1.5

- **Recorrido Visual 5S** para exponer resultados área por área con fotografías, comentarios, recomendaciones, resultado y las 10 preguntas.
- Botón de **pantalla completa** para usar el recorrido directamente en juntas.
- **Un solo QR general** para todos los tableros 5S.
- El QR abre una página de selección con las 11 áreas **sin mostrar porcentajes**.
- Al elegir un área se muestra su auditoría publicada más reciente, incluyendo las 10 preguntas, criterios, evidencias y recomendaciones.
- Se conserva la participación opcional para que el área comparta evidencia de mejora.
- Los enlaces QR directos de la versión anterior siguen siendo compatibles.

## Antes de publicar

1. En Firebase > Firestore Database > Rules, reemplaza las reglas por `firestore.rules` y presiona **Publicar**.
2. Sustituye los archivos de tu repositorio GitHub por los de esta carpeta.
3. Haz commit y espera a que GitHub Pages se actualice.
4. Abre la app y vuelve a publicar al menos la auditoría más reciente de cada área que quieras mostrar en el QR general. Al publicar, la app actualizará automáticamente el acceso de esa área.

## QR general

En **Resultados** encontrarás el bloque **Portal general de Resultados 5S**. Desde ahí puedes:

- Ver una vista previa.
- Copiar el enlace general.
- Descargar `QR-General-Resultados-5S-MPS.png`.

Este QR puede permanecer en todos los tableros. Cada semana solo necesitas publicar la auditoría nueva de cada área; el QR no cambia.

## Recorrido Visual 5S

En **Resultados** usa:

- `Iniciar Recorrido Visual 5S` para verlo dentro de la app.
- `Presentar en pantalla completa` para juntas.

El recorrido usa la auditoría más reciente disponible de cada área y respeta el orden del catálogo de áreas.

## Nota

El análisis de fotografías mediante IA sigue dependiendo de la función de servidor configurada para ese fin. La calificación oficial no se modifica automáticamente por el análisis visual.
