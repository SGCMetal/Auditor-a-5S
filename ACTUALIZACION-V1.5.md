# Actualización a v1.5

## 1. Publicar reglas nuevas

Abre Firebase > Firestore Database > Rules, copia todo el contenido de `firestore.rules` y presiona **Publicar**.

La nueva colección pública `publicAreas` permite que el QR general conozca únicamente cuál es la auditoría publicada más reciente de cada una de las 11 áreas. No se permite listar libremente los documentos desde Firestore.

## 2. Actualizar GitHub

Sube el contenido de esta carpeta a la raíz del repositorio, reemplazando la versión anterior. No subas el ZIP como único archivo.

## 3. Actualizar áreas en el portal general

Las auditorías antiguas continúan funcionando con sus enlaces directos. Para que un área aparezca como disponible dentro del nuevo QR general, abre en la app su auditoría más reciente y usa **Publicar resultados y evidencias**.

Hazlo una vez por cada área que quieras activar. En las semanas siguientes bastará publicar la nueva auditoría y el mismo QR apuntará automáticamente al resultado más reciente.

## 4. Descargar el QR general

Ve a **Resultados** > **Portal general de Resultados 5S** > **Descargar QR general**.

Puedes imprimir el mismo código en todos los tableros.

## 5. Probar el recorrido visual

Ve a **Resultados** y selecciona **Presentar en pantalla completa**. Revisa:

- navegación por área;
- fotografías generales y por pregunta;
- resultado del área;
- sugerencias principales;
- las 10 preguntas evaluadas;
- botones de área anterior/siguiente.
