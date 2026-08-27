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

test("las diez fichas PDF originales permanecen disponibles", () => {
  assert.equal(originalPdfNames.size, 10);
  assert.equal(new Set(PRODUCT_DOCUMENTS.map((document) => document.productId)).size, 10);
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

test("GitHub Pages incluye recuperación de rutas internas", () => {
  const fallback = readFileSync("public/404.html", "utf8");
  const index = readFileSync("index.html", "utf8");
  assert.match(fallback, /segmentsToKeep = 1/);
  assert.match(index, /location\.search\.startsWith\("\?\/"\)/);
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
