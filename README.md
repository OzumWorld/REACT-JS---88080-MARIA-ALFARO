# Arcillas Argentinas

Aplicación React para consultar el catálogo, armar un pedido, elegir un punto de retiro y enviarlo por WhatsApp al contacto correspondiente.

## Desarrollo

```bash
npm ci
npm run dev
```

## Verificaciones

```bash
npm test
npm run lint
npm run build
```

## Publicación

El workflow `.github/workflows/deploy.yml` construye y publica el sitio en GitHub Pages desde `main`. La solución de redirección incluida en `public/404.html` permite recargar rutas internas de la SPA.

## Configuración

- Firebase: variables `VITE_FIREBASE_*` para catálogo y registro opcional de pedidos.
- Contacto: consultar `docs/CONTACTO.md` y `.env.example`.
- Puntos de retiro: `src/config/pickupPoints.js`; Olivos permanece deshabilitado de forma reversible.
- Datos técnicos pendientes: `docs/DATOS_TECNICOS_PENDIENTES.md`.
