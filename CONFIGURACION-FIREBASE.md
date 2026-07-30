# Configuración rápida de Firebase

Esta configuración permite que la auditora registre la información desde su celular y que el Coordinador del SGC la consulte desde su computadora.

## 1. Crear el proyecto

1. Entra a Firebase Console con la cuenta de Google que administrará la app.
2. Selecciona **Crear un proyecto**.
3. Nombre sugerido: `mps-auditoria-5s`.
4. Google Analytics es opcional para esta aplicación.

## 2. Registrar la aplicación web

1. Dentro del proyecto, presiona el ícono **Web `</>`**.
2. Nombre sugerido: `Auditoria 5S MPS`.
3. No es necesario activar Firebase Hosting si se utilizará GitHub Pages.
4. Copia el objeto `firebaseConfig`.
5. Pega sus valores en `config.js`.

## 3. Activar Authentication

1. Abre **Authentication**.
2. Presiona **Comenzar**.
3. En **Método de acceso**, habilita **Correo electrónico/Contraseña**.
4. No habilites el registro dentro de la app.
5. En **Usuarios**, crea manualmente al menos dos cuentas:
   - Cuenta de la auditora.
   - Cuenta del Coordinador del SGC.
6. En **Configuración > Dominios autorizados**, agrega el dominio donde publicarás la app. Para GitHub Pages normalmente será `TU-USUARIO.github.io`. Si realizarás pruebas locales, agrega también `localhost`.

Las contraseñas se pueden cambiar posteriormente desde Firebase Console.

## 4. Crear Cloud Firestore

1. Abre **Firestore Database**.
2. Presiona **Crear base de datos**.
3. Selecciona **Modo de producción**.
4. Elige una región cercana. Para una operación en Nuevo León puede usarse una región de Estados Unidos si es la opción disponible más cercana.

## 5. Colocar las reglas

En Firestore abre la pestaña **Reglas**, sustituye el contenido por el archivo `firestore.rules` y presiona **Publicar**.

Las reglas incluidas permiten entrar únicamente a las cuentas creadas en Authentication.

El proyecto también incluye `firestore.indexes.json`, que evita indexar el contenido pesado de las fotografías. Si utilizas Firebase CLI, se publica junto con las reglas mediante `firebase deploy --only firestore`. Para la primera prueba la app funciona aunque todavía no se haya aplicado esta exención, pero conviene desplegarla antes del uso continuo.

## 6. Publicar la aplicación

Sube todos los archivos del proyecto a GitHub y activa GitHub Pages.

Después abre el mismo enlace:

- En el celular de la auditora.
- En la computadora o celular del Coordinador del SGC.

Ambos deben iniciar sesión con sus cuentas.

## 7. Prueba final

Realiza una auditoría de prueba con una sola área. Al presionar **Guardar y sincronizar**, confirma en el otro dispositivo que la auditoría aparezca en **Historial**.

## Notas importantes

- Esta versión no usa Cloud Storage; guarda las fotografías comprimidas en documentos separados de Firestore.
- No coloques contraseñas dentro de GitHub.
- La configuración `firebaseConfig` de una aplicación web no es una contraseña; la protección real depende de Authentication y de las reglas de Firestore.
