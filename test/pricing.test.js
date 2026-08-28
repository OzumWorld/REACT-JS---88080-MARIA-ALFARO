import test from "node:test";
import assert from "node:assert/strict";
import { CATALOGO } from "../src/data/catalogo.js";
import { calculateCartTotal, getUnitPriceForQuantity } from "../src/lib/pricing.js";

const gresBlanco = CATALOGO.find((product) => product.id === "pasta-gres-blanco");
const barbotina = CATALOGO.find((product) => product.id === "barbotina");

test("aplica los tres precios confirmados de Pasta Gres Blanco", () => {
  assert.equal(getUnitPriceForQuantity(gresBlanco, 1), 13500);
  assert.equal(getUnitPriceForQuantity(gresBlanco, 10), 13000);
  assert.equal(getUnitPriceForQuantity(gresBlanco, 20), 12500);
});

test("el carrito calcula Gres Blanco con el precio del tramo alcanzado", () => {
  const cantidad = 20;
  const precio = getUnitPriceForQuantity(gresBlanco, cantidad);
  assert.equal(calculateCartTotal([{ ...gresBlanco, cantidad, precio }]), 250000);
});

test("barbotina mantiene el precio desde 10 unidades sin inventar un tramo de 20", () => {
  assert.equal(getUnitPriceForQuantity(barbotina, 1), 15500);
  assert.equal(getUnitPriceForQuantity(barbotina, 10), 14500);
  assert.equal(getUnitPriceForQuantity(barbotina, 20), 14500);
});
