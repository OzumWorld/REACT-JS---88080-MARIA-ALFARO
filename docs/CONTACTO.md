# Configuración segura del formulario de contacto

El sitio está preparado para usar Formspree, compatible con GitHub Pages. El receptor temporal confirmado es `arcillasargentinas@gmail.com`. El frontend no contiene contraseñas ni claves privadas. Mientras el endpoint permanezca vacío, el formulario no transmite consultas.

## Activación pendiente

1. Ingresar a Formspree con una cuenta administrada por Arcillas Argentinas.
2. Crear un formulario llamado, por ejemplo, “Consultas web - Arcillas Argentinas”.
3. Asociar `arcillasargentinas@gmail.com` como receptor.
4. Abrir el correo de verificación enviado por Formspree y confirmar la dirección. Este paso debe hacerlo la usuaria desde su correo; no debe compartir contraseña, código ni enlace privado por chat.
5. Copiar únicamente el endpoint público con formato `https://formspree.io/f/xxxxxxxx`.
6. En GitHub, abrir `Settings` → `Secrets and variables` → `Actions` → `Variables` → `New repository variable`.
7. Crear la variable `VITE_CONTACT_FORM_ENDPOINT` y pegar como valor el endpoint público de Formspree. No crear una variable con la contraseña del correo.
8. Ejecutar nuevamente el workflow de Pages o esperar al despliegue posterior al merge.
9. En el sitio publicado, enviar una consulta de prueba sin datos sensibles y confirmar que llegue al receptor correcto.

La lectura está centralizada en `src/config/contact.js`. El endpoint de Formspree es un identificador público, no una contraseña. La dirección receptora se conserva como referencia de configuración, pero el envío real depende exclusivamente del formulario verificado dentro de Formspree.

Mientras no exista un endpoint válido, el formulario se muestra para revisión pero informa que la recepción está pendiente y no transmite datos. El enlace comercial de WhatsApp permanece disponible.

## Operación y entregas

El flujo principal continúa siendo el retiro en Martínez, Béccar, Maschwitz, Tigre o San Clemente del Tuyú. No se ofrecen envíos nacionales ni cálculo de transporte. Si en el futuro se incorpora una aclaración comercial, el texto autorizado es: “Consultanos por entregas especiales”, sin prometer cobertura, tarifas ni plazos.
