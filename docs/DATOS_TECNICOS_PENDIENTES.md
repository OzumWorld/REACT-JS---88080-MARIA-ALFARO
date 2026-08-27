# Estado de las fichas técnicas originales

## Fuente autorizada

Las diez fichas PDF originales están en iCloud dentro del proyecto original:

`CODERHOUSE/React JS - 88080 Maria Alfaro/arcillas-argentinas/public/fichas/`

- Barbotina bidon 9 kg.pdf
- Barbotina para Gres bidon 9 kg.pdf
- Pasta Blanca con Chamote.pdf
- Pasta Fuego Directo.pdf
- Pasta Gres Tostado Claro.pdf
- Pasta Gres Tostado Oscuro.pdf
- Pasta Lisa Blanca.pdf
- Pasta Raku.pdf
- Pasta Roja con Chamote.pdf
- Pasta Roja.pdf

Las imágenes correspondientes están en `public/img/` dentro del mismo proyecto original.

## Restricción vigente

Estos archivos no deben regenerarse ni completarse. El paquete `fichas-arcillas-argentinas.zip` ya fue descargado y validado localmente; la etapa de binarios queda abierta únicamente hasta importarlo en esta rama mediante el mecanismo seguro indicado abajo.

La asociación de nombres y rutas está centralizada en `src/config/productDocuments.js`. La sección “Fichas técnicas” muestra los diez documentos, incluido Pasta Raku, sin inventar un producto comercial ni un precio.

## Importación segura del paquete descargado

El ZIP no debe incorporarse al repositorio. Desde una copia local posicionada en la rama `codex/redesign-fichas-contacto`, ejecutar:

```bash
npm run import:fichas -- "/ruta/completa/fichas-arcillas-argentinas.zip"
npm test
npm run build
git diff -- public/fichas
```

El importador extrae en un directorio temporal, exige exactamente los diez nombres autorizados, valida la cabecera PDF y sólo después reemplaza los archivos de `public/fichas/`. Si falta o sobra un nombre, no modifica el proyecto.

## Asociación pendiente del catálogo

El catálogo activo actual incluye “Barbotina Canje”, para la cual no se confirmó una ficha propia dentro de la lista original. A su vez, la lista original contiene “Pasta Raku”, que no integra el catálogo activo actual.

Hasta revisar los archivos descargados y confirmar la correspondencia comercial:

- Barbotina Canje se muestra sin enlace PDF.
- No se reutiliza la ficha de Barbotina como sustituto.
- Pasta Raku se integra en la sección documental, pero no se agrega automáticamente al catálogo comercial.
- No se infieren datos técnicos, temperaturas, usos ni composiciones.
