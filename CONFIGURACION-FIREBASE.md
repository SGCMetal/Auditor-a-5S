# Configuración rápida de Firebase — acceso anónimo

Esta configuración permite que la auditora registre desde su celular y que el Coordinador del SGC consulte desde su computadora, sin crear correos ni contraseñas.

## 1. Crear el proyecto

1. Entra a Firebase Console.
2. Selecciona **Crear un proyecto**.
3. Nombre sugerido: `mps-auditoria-5s`.
4. Google Analytics es opcional.

## 2. Registrar la aplicación web

1. Dentro del proyecto, presiona el ícono **Web `</>`**.
2. Nombre sugerido: `Auditoria 5S MPS`.
3. Copia el objeto `firebaseConfig`.
4. Pega sus valores en `config.js`.

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

## 3. Activar Authentication anónimo

1. Abre **Authentication**.
2. Presiona **Comenzar**.
3. Abre **Método de acceso** o **Sign-in method**.
4. Selecciona **Anónimo / Anonymous**.
5. Actívalo y guarda.

No debes crear usuarios manualmente. Cada navegador obtiene una sesión anónima automáticamente.

En **Configuración > Dominios autorizados**, agrega el dominio donde publicarás la app si no aparece. Para GitHub Pages normalmente es `TU-USUARIO.github.io`. Para pruebas locales usa `localhost`.

## 4. Crear Cloud Firestore

1. Abre **Firestore Database**.
2. Presiona **Crear base de datos**.
3. Selecciona **Modo de producción**.
4. Elige la región adecuada.

## 5. Publicar las reglas

En Firestore abre **Reglas**, sustituye el contenido por `firestore.rules` y presiona **Publicar**.

Estas reglas permiten lectura y escritura a cualquier sesión autenticada, incluida la sesión anónima creada por la app. El enlace publicado debe mantenerse dentro del personal autorizado.

## 6. Publicar la aplicación

Sube todos los archivos del proyecto a GitHub y activa GitHub Pages. Después abre el mismo enlace en:

- El celular de la auditora.
- La computadora o celular del Coordinador del SGC.

No aparecerá una pantalla de inicio de sesión. La conexión anónima se realizará automáticamente.

## 7. Prueba final

1. En el celular escribe el nombre de la auditora.
2. Realiza una auditoría corta con una fotografía.
3. Presiona **Guardar y sincronizar**.
4. En la computadora abre **Historial**.
5. Confirma que aparezcan el resultado, recomendaciones y fotografía.
6. Exporta el Excel.

## Aviso de seguridad

Esta solución elimina la fricción para la prueba de mañana, pero cualquier persona con el enlace puede entrar de forma anónima. No compartas el enlace fuera de MPS.
