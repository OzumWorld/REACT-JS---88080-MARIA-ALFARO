# Configuración segura del formulario de contacto

El sitio está preparado para usar Formspree, compatible con GitHub Pages. El frontend no contiene contraseñas, claves privadas ni el email receptor. Mientras la dirección no esté confirmada, `recipientEmail` permanece en `null` y el endpoint en una cadena vacía: el formulario no transmite consultas.

## Activación pendiente

1. Confirmar el email que recibirá las consultas.
2. Crear un formulario en Formspree asociado a ese email y verificar la dirección.
3. Copiar el endpoint público con formato `https://formspree.io/f/xxxxxxxx`.
4. Crear en GitHub la variable de Actions `VITE_CONTACT_FORM_ENDPOINT` con ese endpoint.
5. Exponerla al paso `npm run build` del workflow de Pages.

La lectura está centralizada en `src/config/contact.js`. El endpoint de Formspree es un identificador público, no una contraseña; el email receptor queda administrado por el proveedor y no aparece en el código del sitio.

Mientras no exista el endpoint, el formulario se muestra para revisión pero informa que la recepción está pendiente y no transmite datos. El enlace comercial de WhatsApp permanece disponible.
