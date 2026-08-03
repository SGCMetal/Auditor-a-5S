# Actualización a versión 1.4

## 1. Respaldo

Antes de reemplazar archivos, descarga una copia del repositorio actual de GitHub.

## 2. Publicar reglas nuevas de Firestore

1. Abre Firebase Console.
2. Entra al proyecto `auditoria-5s-b5646`.
3. Ve a **Firestore Database → Rules**.
4. Sustituye todo el contenido por el archivo `firestore.rules` de este paquete.
5. Pulsa **Publicar**.

Estas reglas agregan las colecciones públicas necesarias para el QR y las evidencias opcionales de mejora.

## 3. Actualizar GitHub Pages

1. Descomprime este paquete.
2. Sustituye los archivos del repositorio por los archivos de esta carpeta.
3. No subas carpetas `node_modules` ni archivos con claves privadas.
4. Haz commit y push.
5. Espera a que GitHub Pages actualice.
6. Abre la app, ciérrala y vuelve a abrirla para que el Service Worker cargue la versión 1.4.

## 4. Prueba obligatoria antes del siguiente recorrido

1. Realiza una auditoría de prueba con 1 fotografía en una pregunta y 1 fotografía general.
2. Guarda y sincroniza.
3. Abre la auditoría desde otro dispositivo.
4. Pulsa **Publicar y generar QR**.
5. Descarga el QR.
6. Escanéalo desde un teléfono que no tenga la app instalada.
7. Confirma que solo aparezcan resultado, criterios, fotografías y recomendaciones.
8. Envía una evidencia opcional de mejora desde el portal.
9. Regresa al detalle interno y confirma que aparezca pendiente de revisión.

## 5. Activar análisis visual con IA

La aplicación funciona sin IA, usando los criterios, calificaciones y observaciones. Para activar el análisis visual:

1. Instala Firebase CLI y Node.js.
2. En una terminal, entra a la carpeta del proyecto.
3. Inicia sesión y selecciona el proyecto:

```bash
firebase login
firebase use auditoria-5s-b5646
```

4. Registra la clave de OpenAI como secreto. No la pegues en GitHub:

```bash
firebase functions:secrets:set OPENAI_API_KEY
```

5. Instala dependencias y publica la función:

```bash
cd functions
npm install
cd ..
firebase deploy --only functions:analyze5SEvidence
```

6. Firebase mostrará una URL HTTPS de la función. Pégala en `config.js`:

```javascript
AI_ENDPOINT: "URL_HTTPS_DE_LA_FUNCION"
```

7. Vuelve a subir `config.js` a GitHub.
8. Haz una auditoría de prueba con fotografías y confirma que el análisis se ejecute al llegar al resultado.

## 6. Generar el QR semanal

1. Guarda la auditoría.
2. Abre el detalle desde Historial.
3. Pulsa **Publicar y generar QR**.
4. Pulsa **Descargar QR**.
5. Coloca la imagen en el tablero semanal correspondiente.

Cada auditoría genera un identificador distinto. Los QR anteriores continúan abriendo su propia evidencia histórica.
