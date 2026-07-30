# App Auditoría 5S MPS — Versión 1

Aplicación web progresiva para realizar las auditorías semanales 5S desde el celular, usando los criterios definidos por MPS y generando retroalimentación práctica por área.

## Funciones incluidas

- 11 áreas configuradas.
- 10 preguntas con criterios específicos del 1 al 5.
- Evaluación guiada desde el celular.
- Observaciones y hasta dos fotografías por pregunta.
- Guardado automático de auditorías incompletas.
- Cálculo del resultado y comparación contra la meta del 80%.
- Plan de mejora 5S con sugerencias para subir la calificación.
- Historial de auditorías y resumen por área.
- Exportación real a Excel `.xlsx` con tres hojas:
  - Resumen semanal.
  - Detalle de auditoría.
  - Plan de mejora 5S.
- Logo y colores de Metal Plating y Servicios.
- Instalación como PWA.
- Preparación para análisis opcional de fotografías con inteligencia artificial.

## Probarla en la computadora

La aplicación no requiere instalar dependencias.

```bash
python3 -m http.server 8080
```

Después abre:

```text
http://localhost:8080
```

También puede publicarse directamente en GitHub Pages porque todos los archivos son estáticos.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube el contenido de esta carpeta a la rama principal.
3. En `Settings > Pages`, selecciona `Deploy from a branch`.
4. Elige la rama principal y la carpeta raíz `/`.
5. Guarda y espera a que GitHub genere el enlace.

## Almacenamiento de esta versión

Los datos y fotografías se guardan en `IndexedDB` dentro del navegador del dispositivo. Esto permite probar la app sin configurar una base de datos.

Importante: cada teléfono o computadora conserva sus propios registros. La siguiente etapa será conectar Firebase para que todos los usuarios consulten una base centralizada y las fotos tengan respaldo.

## Análisis visual con IA

Sin IA, la app ya genera recomendaciones usando:

- Calificación seleccionada.
- Criterio correspondiente.
- Observación del auditor.

Para que también analice las fotografías se incluye una función de ejemplo en la carpeta `functions/`. La clave de la API debe guardarse únicamente en el servidor. Nunca debe colocarse en `config.js`, GitHub o el navegador.

Una vez desplegada la función, se coloca su URL en:

```js
window.MPS_CONFIG = {
  AI_ENDPOINT: "https://URL-DE-LA-FUNCION"
};
```

Las sugerencias visuales no cambian la calificación oficial; enriquecen la retroalimentación para el área.

## Ajuste visual v1.1

- Se sustituyó el recorte cuadrado del encabezado por el logotipo completo de MPS.
- Se agregó un ícono cuadrado independiente para instalación en celular y pestaña del navegador.
- Se actualizó la caché de la PWA para que el nuevo logotipo aparezca al volver a publicar.
