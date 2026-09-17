# Actualización v1.6.1 — Tablero y Libro de trabajo corregidos

## Cambios principales

1. El portal del QR conserva el diseño del tablero físico MPS: logo, título, meta 80%, ranking, colores por área, avance en 10 bloques, nivel, semáforo, resumen general, leyenda y mensaje.
2. El tablero solo toma resultados de la semana publicada más reciente. Las áreas que todavía no tengan auditoría de esa semana aparecen como PENDIENTE.
3. En cada pregunta se destaca claramente **ACCIONES PARA MEJORAR ESTA CALIFICACIÓN** y se indica el objetivo de la siguiente revisión.
4. El Libro de trabajo 5S se genera directamente desde esas recomendaciones, aunque la colección de tareas todavía no exista en Firebase. Esto corrige el caso donde aparecía “Sin tareas pendientes” aun cuando sí había recomendaciones.
5. Las tareas se agrupan por pregunta, muestran calificación actual, objetivo, prioridad y progreso. Se pueden marcar y desmarcar desde el QR.
6. La app conserva el estado de las tareas en Firebase sin modificar la calificación vigente.

## Para actualizar

- Sustituye los archivos del repositorio de GitHub por los de esta carpeta.
- No necesitas cambiar las reglas de Firestore si ya publicaste las reglas de la v1.6.
- Haz Commit changes y espera a que GitHub Pages actualice.
- Cierra y vuelve a abrir la app instalada para que el nuevo service worker cargue la v1.6.1.
- Abre el QR fijo y verifica el tablero.

## Importante sobre auditorías ya publicadas

No es obligatorio republicarlas para que aparezcan tareas: la v1.6.1 puede reconstruir el Libro de trabajo desde el plan de mejora ya publicado. Al marcar por primera vez una tarea, se crea su registro de seguimiento en Firebase.
