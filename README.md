# App Auditoría 5S MPS — Versión 1.2 Cloud

Aplicación web progresiva para realizar las auditorías semanales 5S desde el celular y consultar los resultados desde otros dispositivos.

## Qué incluye

- Las 11 áreas de MPS.
- Las 10 preguntas con criterios específicos del 1 al 5.
- Observaciones y hasta dos fotografías por pregunta.
- Cálculo automático del resultado.
- Plan de mejora 5S con recomendaciones prácticas.
- Historial, panel por área y exportación a Excel.
- Inicio de sesión con cuentas autorizadas.
- Sincronización de auditorías y fotografías con Cloud Firestore.
- Copia local mediante IndexedDB.
- Soporte para trabajo temporal sin conexión mediante la caché de Firestore y la PWA.

## Arquitectura de esta versión

- **GitHub Pages o Firebase Hosting:** publica la aplicación.
- **Firebase Authentication:** controla quién puede entrar.
- **Cloud Firestore:** guarda auditorías y fotografías comprimidas.
- **IndexedDB:** mantiene una copia local y los borradores.

Las fotografías se almacenan como documentos individuales dentro de la subcolección `audits/{auditId}/photos`. Se comprimen antes de guardarse para mantenerse debajo del límite por documento.

## Configuración necesaria

Sigue el archivo [CONFIGURACION-FIREBASE.md](./CONFIGURACION-FIREBASE.md).

Al terminar, edita `config.js` y pega la configuración web de Firebase:

```js
window.MPS_CONFIG = {
  FIREBASE: {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  },
  AI_ENDPOINT: ""
};
```

La configuración web de Firebase es pública y puede estar en GitHub. No coloques contraseñas ni claves privadas en `config.js`.

## Probar en la computadora

```bash
python3 -m http.server 8080
```

Después abre:

```text
http://localhost:8080
```

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio.
2. Abre `Settings > Pages`.
3. Selecciona `Deploy from a branch`.
4. Elige la rama principal y la carpeta `/ (root)`.
5. Guarda y abre el enlace publicado.

## Prueba recomendada antes del recorrido

1. Inicia sesión en el celular de la auditora.
2. Inicia sesión en la computadora del Coordinador del SGC.
3. Desde el celular realiza una auditoría de prueba con una fotografía.
4. Guarda la auditoría.
5. En la computadora abre `Historial` y confirma que aparezcan resultado, recomendaciones y fotografía.
6. Exporta el Excel.

## Seguridad

La aplicación no permite registrar cuentas nuevas. Las cuentas deben crearse manualmente en Firebase Authentication.

Las reglas incluidas permiten lectura y escritura únicamente a usuarios autenticados. Para una etapa posterior se pueden separar permisos de auditor y administrador.
