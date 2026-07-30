# App Auditoría 5S MPS — Versión 1.3 Anónima

Aplicación web progresiva para realizar auditorías semanales 5S desde el celular y consultar los resultados desde otros dispositivos, **sin correos ni contraseñas**.

## Cómo funciona el acceso

Al abrir la app, Firebase crea automáticamente una sesión anónima en ese navegador. La auditora solo escribe su nombre en la pantalla principal; ese nombre queda registrado dentro de cada auditoría.

Todos los dispositivos que abran la misma aplicación y tengan Firebase configurado podrán consultar el historial compartido.

## Qué incluye

- Las 11 áreas de MPS.
- Las 10 preguntas con criterios específicos del 1 al 5.
- Observaciones y hasta dos fotografías por pregunta.
- Cálculo automático del resultado.
- Plan de mejora 5S con recomendaciones prácticas.
- Historial, panel por área y exportación a Excel.
- Acceso anónimo automático con Firebase Authentication.
- Sincronización de auditorías y fotografías con Cloud Firestore.
- Copia local mediante IndexedDB.
- Trabajo temporal sin conexión mediante la caché de Firestore y la PWA.

## Configuración necesaria

Sigue [CONFIGURACION-FIREBASE.md](./CONFIGURACION-FIREBASE.md). En resumen:

1. Crea un proyecto de Firebase.
2. Registra una aplicación web.
3. Activa **Authentication > Anónimo**.
4. Crea Firestore en modo de producción.
5. Publica `firestore.rules`.
6. Pega el objeto `firebaseConfig` dentro de `config.js`.
7. Publica los archivos en GitHub Pages o Firebase Hosting.

La configuración web de Firebase es pública. No coloques contraseñas ni claves privadas en `config.js`.

## Probar localmente

```bash
python3 -m http.server 8080
```

Abre `http://localhost:8080`.

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio.
2. Abre `Settings > Pages`.
3. Selecciona `Deploy from a branch`.
4. Elige la rama principal y `/ (root)`.
5. Guarda y abre el enlace publicado.

## Seguridad de esta versión

Esta modalidad es práctica para la prueba inmediata, pero **el enlace de la app funciona como la llave de acceso**: cualquier persona que lo obtenga podrá crear una sesión anónima y consultar o registrar información porque las reglas permiten acceso a cualquier usuario autenticado.

Para reducir exposición:

- No publiques el enlace en sitios abiertos.
- No lo compartas fuera del personal autorizado.
- El proyecto incluye `noindex,nofollow` para desalentar su aparición en buscadores.
- En una etapa posterior conviene agregar cuentas, roles o App Check.

## Fotografías

Las fotografías se comprimen y se guardan como documentos individuales en `audits/{auditId}/photos`. No se utiliza Cloud Storage en esta versión.
