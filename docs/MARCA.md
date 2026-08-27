# Identidad de Arcillas Argentinas

La dirección de marca definitiva usa una vasija construida con estratos de tierra. El dibujo es plano, sin gradientes, brillos ni sombras, para conservar legibilidad y permitir reproducción vectorial.

## Archivos

- `public/brand/arcillas-symbol-color.svg`: símbolo principal multicolor.
- `public/brand/arcillas-symbol-mono.svg`: símbolo monocromático para documentos, impresión y tamaños pequeños.
- `public/favicon.svg`: adaptación monocromática optimizada para pestañas del navegador.

El símbolo y el wordmark se mantienen separados. En la web, `BrandSymbol` renderiza el símbolo y `BrandWordmark` aplica automáticamente la variante `on-light` u `on-dark`.

## Uso de color

- Fondo claro: wordmark en arcilla oscura y azul profundo como apoyo.
- Fondo oscuro: “Arcillas” en crema y “Argentinas” en dorado.
- El símbolo principal conserva arena, dorado, terracota y azul profundo.
- La variante monocromática puede recolorearse según el soporte; debe mantener contraste suficiente con el fondo.

## Contraste verificado

Las combinaciones principales cumplen WCAG 2.1 AA para texto normal: crema sobre header (10,68:1), crema sobre botón principal (7,56:1), texto general sobre arena (10,92:1), texto secundario sobre tarjeta (6,69:1), azul profundo sobre arena (8,96:1) y dorado del wordmark sobre header (6,31:1). Los estados deshabilitados usan texto `#6b554c` sobre `#ded0c1` (4,59:1) y no dependen sólo de opacidad.

No estirar, rotar, agregar efectos luminosos ni recombinar los estratos.
