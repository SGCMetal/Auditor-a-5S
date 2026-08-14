# Cambio de logo v1.5.1

El logotipo mostrado dentro del encabezado, portal público y Recorrido Visual está integrado directamente en `app.js` como una imagen embebida.

Esto evita que el encabezado muestre una imagen rota cuando el archivo `logo-mps-header.png` no pueda resolverse por la ruta local.

Los archivos de icono (`icon-mps-192.png`, `icon-mps-512.png` y `favicon-mps.png`) se mantienen externos porque son utilizados por el navegador y la instalación PWA.

Para actualizar GitHub, sustituye los archivos del repositorio por esta versión y realiza un commit. El cambio de nombre de caché en `sw.js` fuerza la actualización de la PWA instalada.
