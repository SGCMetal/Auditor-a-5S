# Auditoría 5S MPS — pasos siguientes

La conexión del proyecto `auditoria-5s-b5646` ya está colocada en `config.js`.

## Antes de publicar

1. En Firebase Authentication, confirma que el proveedor **Anónimo** esté habilitado.
2. En Firestore Database > Rules, confirma que las reglas incluidas en `firestore.rules` estén publicadas.
3. Sube todos los archivos de esta carpeta al repositorio de GitHub, reemplazando la versión anterior.
4. Espera a que GitHub Pages termine el despliegue.
5. Abre la app en una ventana privada o actualiza con `Ctrl + F5` para evitar una versión en caché.

## Prueba entre dos dispositivos

1. En el celular de la auditora, abre el enlace y captura una auditoría de prueba.
2. Termina y guarda la auditoría.
3. En la computadora del Coordinador del SGC, abre el mismo enlace.
4. Entra a **Historial** y comprueba que aparezca la auditoría.
5. Abre el registro y confirma calificaciones, observaciones y fotografías.
6. Exporta el Excel de prueba.

## Indicador esperado

La app debe mostrar un estado de nube conectado o sincronizado. Si indica modo local, revisa:

- Proveedor anónimo habilitado.
- Reglas publicadas.
- Dominio de GitHub Pages autorizado en Firebase Authentication > Settings > Authorized domains.
- Conexión a internet.
