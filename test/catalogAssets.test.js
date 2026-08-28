import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { CATALOGO, PRODUCT_INFO } from "../src/data/catalogo.js";
import { PRODUCT_DOCUMENTS } from "../src/config/productDocuments.js";

const aliases = {
  "pasta-roja-fuego-directo": "pasta-fuego-directo",
  "pasta-gres-tostado-oscura": "pasta-gres-tostado-oscuro",
};

const originalPdfNames = new Set(PRODUCT_DOCUMENTS.map((document) => document.fileName));

test("las fichas PDF disponibles permanecen asociadas sin duplicados", () => {
  assert.equal(originalPdfNames.size, 11);
  assert.equal(new Set(PRODUCT_DOCUMENTS.map((document) => document.productId)).size, 11);
  for (const name of originalPdfNames) {
    assert.equal(existsSync(`public/fichas/${name}`), true, `No existe ${name}`);
  }
});

test("cada producto activo tiene imagen y sólo usa una ficha original asociada", () => {
  for (const product of CATALOGO) {
    const info = PRODUCT_INFO[aliases[product.id] || product.id];
    assert.ok(info, `Falta información para ${product.id}`);
    assert.ok(info.img, `Falta imagen para ${product.id}`);
    assert.equal(existsSync(`public${info.img}`), true, `No existe ${info.img}`);
    if (product.id === "barbotina-canje") {
      assert.equal(info.pdf, null, "Barbotina Canje debe esperar una ficha original confirmada");
      continue;
    }
    assert.ok(info.pdf, `Falta asociación PDF para ${product.id}`);
    assert.equal(originalPdfNames.has(info.pdf.split("/").at(-1)), true, `${info.pdf} no es una ficha original confirmada`);
    assert.equal(existsSync(`public${info.pdf}`), true, `No existe ${info.pdf}`);
  }
});

test("el dominio propio incluye recuperación de rutas internas", () => {
  const fallback = readFileSync("public/404.html", "utf8");
  const index = readFileSync("index.html", "utf8");
  const vite = readFileSync("vite.config.js", "utf8");
  assert.match(fallback, /segmentsToKeep = 0/);
  assert.match(index, /location\.search\.startsWith\("\?\/"\)/);
  assert.match(vite, /base: '\/'/);
});

test("la identidad del documento ya no usa Vite", () => {
  const index = readFileSync("index.html", "utf8");
  assert.match(index, /<html lang="es">/);
  assert.match(index, /Arcillas Argentinas \| Pastas y barbotinas/);
  assert.match(index, /href="\.\/favicon\.svg"/);
  assert.doesNotMatch(index, /Vite \+ React|vite\.svg/);
});

test("la marca definitiva separa símbolo, wordmark y variante monocromática", () => {
  const brand = readFileSync("src/components/Brand.jsx", "utf8");
  const favicon = readFileSync("public/favicon.svg", "utf8");
  assert.equal(existsSync("public/brand/arcillas-symbol-color.svg"), true);
  assert.equal(existsSync("public/brand/arcillas-symbol-mono.svg"), true);
  assert.match(brand, /BrandSymbol/);
  assert.match(brand, /BrandWordmark/);
  assert.match(brand, /brand__wordmark--\$\{tone\}/);
  assert.match(favicon, /#7b3529/);
  assert.doesNotMatch(favicon, /gradient|filter|shadow/i);
});

test("el formulario centraliza el receptor y exige un endpoint Formspree válido", () => {
  const config = readFileSync("src/config/contact.js", "utf8");
  assert.match(config, /recipientEmail: "arcillasargentinas@gmail\.com"/);
  assert.match(config, /VITE_CONTACT_FORM_ENDPOINT \|\| ""/);
  assert.match(config, /https:\\\/\\\/formspree\\\.io/);
});

test("la operación pública continúa basada en retiro y no promete envíos nacionales", () => {
  const publicCopy = [
    readFileSync("src/pages/Home.jsx", "utf8"),
    readFileSync("src/pages/Checkout.jsx", "utf8"),
    readFileSync("src/components/ContactSection.jsx", "utf8"),
  ].join("\n");
  assert.match(publicCopy, /puntos? de retiro/i);
  assert.doesNotMatch(publicCopy, /envíos nacionales|cálculo de envío|tarifa de envío|entregamos en todo el país/i);
});

test("el carrito solicita el punto de retiro antes de continuar", () => {
  const cart = readFileSync("src/components/Cart.jsx", "utf8");
  const checkout = readFileSync("src/pages/Checkout.jsx", "utf8");
  assert.match(cart, /ACTIVE_PICKUP_POINTS/);
  assert.match(cart, /Punto de retiro/);
  assert.match(cart, /Elegí dónde retirar/);
  assert.match(cart, /disabled=\{!pickupPointId\}/);
  assert.match(checkout, /location\.state\?\.pickupPointId/);
});

test("la condición de canje está centralizada y no se aplica a otras barbotinas", () => {
  const config = readFileSync("src/config/commercialConditions.js", "utf8");
  const canje = PRODUCT_INFO["barbotina-canje"];
  assert.match(config, /PHOTO-2026-08-07-10-58-32\.jpg/);
  assert.match(canje.commercialCondition, /Los bidones de 9 kg deben entregarse vacíos, limpios y en perfecto estado/);
  assert.equal(PRODUCT_INFO.barbotina.commercialCondition, undefined);
  assert.equal(PRODUCT_INFO["barbotina-gres-tostado-oscuro"].commercialCondition, undefined);
});

test("la barbotina común y su modalidad de canje comparten la cocción confirmada", () => {
  assert.equal(PRODUCT_INFO.barbotina.coccion, "1020-1040 °C");
  assert.equal(PRODUCT_INFO["barbotina-canje"].coccion, "1020-1040 °C");
  assert.equal(PRODUCT_INFO["barbotina-gres-tostado-oscuro"].coccion, "1240–1250 °C");
});

test("Pasta Gres Blanco conserva presentación y precios confirmados", () => {
  const product = CATALOGO.find((item) => item.id === "pasta-gres-blanco");
  assert.ok(product);
  assert.equal(product.nombre, "Pasta Gres Blanco (bolsa 5 kg)");
  assert.deepEqual(product.precios, { unidad: 13500, pack10: 13000, pack20: 12500 });
});

test("Pasta Gres Blanco publica los datos técnicos confirmados", () => {
  const info = PRODUCT_INFO["pasta-gres-blanco"];
  assert.equal(info.coccion, "1225-1230 °C (cono 5 1/2)");
  assert.match(info.resumen, /Contracción 12%/);
  assert.match(info.resumen, /absorción 2,33%/);
  assert.match(info.resumen, /compatibilidad confirmada con esmaltes DpColors/);
  assert.equal(info.pdf, "/fichas/Pasta Gres Blanco.pdf");
  assert.equal(info.pendingDocument, undefined);
});

test("las pastas Gres y Raku publican las temperaturas confirmadas", () => {
  for (const id of ["pasta-gres-blanco", "pasta-gres-tostado-claro", "pasta-gres-tostado-oscuro"]) {
    assert.equal(PRODUCT_INFO[id].coccion, "1225-1230 °C (cono 5 1/2)");
  }
  assert.equal(PRODUCT_INFO["pasta-raku"].coccion, "1300 °C");
});

test("los tres Gres de 5 kg comparten la lista confirmada de agosto", () => {
  for (const id of ["pasta-gres-blanco", "pasta-gres-tostado-claro", "pasta-gres-tostado-oscura"]) {
    const product = CATALOGO.find((item) => item.id === id);
    assert.deepEqual(product.precios, { unidad: 13500, pack10: 13000, pack20: 12500 });
  }
});

test("el catálogo conserva todos los precios confirmados de agosto de 2026", () => {
  const expectedPrices = {
    "pasta-lisa-blanca": [16500, 16000, 15500],
    "pasta-blanca-con-chamote": [13500, 13000, 12500],
    "pasta-roja": [13500, 13000, 12500],
    "pasta-roja-con-chamote": [13500, 13000, 12500],
    "pasta-roja-fuego-directo": [13500, 13000, 12500],
    "pasta-gres-tostado-claro": [13500, 13000, 12500],
    "pasta-gres-tostado-oscura": [13500, 13000, 12500],
    "pasta-gres-blanco": [13500, 13000, 12500],
    "pasta-raku": [16000, 15500, 15000],
    barbotina: [15500, 14500, null],
    "barbotina-canje": [14000, 13000, null],
    "barbotina-gres-tostado-oscuro": [19000, 18000, null],
  };

  assert.equal(CATALOGO.length, Object.keys(expectedPrices).length);
  for (const product of CATALOGO) {
    assert.deepEqual(Object.values(product.precios), expectedPrices[product.id]);
  }
});

test("la foto real de Gres Blanco queda asociada sin sustitución", () => {
  assert.equal(existsSync("public/img/RARKNAgWgJnNhlVqoSlc8sw5EAPB4u5zyoVdwGA4-2.jpg"), true);
});

test("Pasta Raku usa la última imagen confirmada por la distribuidora", () => {
  assert.equal(PRODUCT_INFO["pasta-raku"].img, "/img/lFQej9H0B67Y18F6s7Ney1i5emJP9rtceXqgTMHU.jpg");
  assert.equal(existsSync("public/img/lFQej9H0B67Y18F6s7Ney1i5emJP9rtceXqgTMHU.jpg"), true);
});

test("Gres Tostado Claro usa la última imagen confirmada", () => {
  assert.equal(PRODUCT_INFO["pasta-gres-tostado-claro"].img, "/img/KAnQ3tOUwH2DUS3hPozWPyO9BkBcuJvzWpkmGz0k.jpg");
  assert.equal(existsSync("public/img/KAnQ3tOUwH2DUS3hPozWPyO9BkBcuJvzWpkmGz0k.jpg"), true);
});

test("las seis pastas restantes usan las últimas imágenes confirmadas", () => {
  const expected = {
    "pasta-fuego-directo": "/img/ARtb8X5sKj6eKZybZTsHWJmI9bgEF4vAPe2pspEj.jpg",
    "pasta-roja": "/img/S2L3H182VNh8KmSgLLMIKCNNgvb62WjVyvu0qSxZ.jpg",
    "pasta-roja-con-chamote": "/img/ZHySGnePKhP4rdckhrwc0VcMhd0t8ivS5i8hK0mg.jpg",
    "pasta-lisa-blanca": "/img/Ry0cc3fxkSio5IBTbbtfdKJsdfFi5gvFbgYRmJVz.jpg",
    "pasta-gres-tostado-oscuro": "/img/AtYHdHjt1DDQ8KJ11lafBVuxOYtO01KdbmBhkqJP.jpg",
    "pasta-blanca-con-chamote": "/img/babjs0Ks0AvgSWQnwBJaHMCk0Gsz0TCMrfO2XXuK.jpg",
  };

  for (const [productId, imagePath] of Object.entries(expected)) {
    assert.equal(PRODUCT_INFO[productId].img, imagePath);
    assert.equal(existsSync(`public${imagePath}`), true, `No existe ${imagePath}`);
  }
});

test("el inicio usa la nueva fotografía de Pasta Lisa Blanca", () => {
  const home = readFileSync("src/pages/Home.jsx", "utf8");
  assert.match(home, /Ry0cc3fxkSio5IBTbbtfdKJsdfFi5gvFbgYRmJVz\.jpg/);
  assert.doesNotMatch(home, /\/img\/Pasta Lisa Blanca\.jpg/);
});

test("las imágenes confirmadas de barbotina quedan vinculadas al producto correcto", () => {
  assert.equal(PRODUCT_INFO.barbotina.img, "/img/Q543gzgDz8YSZG2YsSJQFqGQLwPwKZtkiygGL0FB.jpg");
  assert.equal(PRODUCT_INFO["barbotina-gres-tostado-oscuro"].img, "/img/qIMurfX4CeA3F0Pufc2FYYVMnBs0DkUMho65yZpG.jpg");
});

test("los bidones industriales grandes quedan fuera del catálogo y del despliegue", () => {
  assert.equal(CATALOGO.some((product) => /tambor|industrial|200\s*(kg|l)/i.test(product.nombre)), false);
  assert.equal(existsSync("archive/future-industrial/README.md"), true);
  const publicFiles = readFileSync("src/data/catalogo.js", "utf8");
  assert.doesNotMatch(publicFiles, /tambor industrial|bidón industrial/i);
});

test("las fotos de pastas no reciben filtros de color", () => {
  const styles = readFileSync("src/index.css", "utf8");
  assert.doesNotMatch(styles, /hero__visual img[^}]*filter:/s);
  assert.doesNotMatch(styles, /product-card__media img[^}]*filter:/s);
});
