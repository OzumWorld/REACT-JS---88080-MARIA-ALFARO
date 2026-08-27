import test from "node:test";
import assert from "node:assert/strict";
import { ACTIVE_PICKUP_POINTS, PICKUP_POINTS, getPickupPointById } from "../src/config/pickupPoints.js";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "../src/lib/whatsappOrder.js";

const cart = [
  { id: "pasta-lisa", nombre: "Pasta Lisa Blanca (10 kg)", cantidad: 2, precio: 15000 },
  { id: "barbotina", nombre: "Barbotina (9 kg)", cantidad: 1, precio: 12000 },
];

test("Olivos permanece configurado pero no puede elegirse", () => {
  const olivos = PICKUP_POINTS.find((point) => point.id === "olivos");
  assert.equal(olivos.enabled, false);
  assert.equal(ACTIVE_PICKUP_POINTS.some((point) => point.id === "olivos"), false);
  assert.equal(getPickupPointById("olivos"), null);
});

test("sólo los cinco puntos habilitados están visibles", () => {
  assert.deepEqual(ACTIVE_PICKUP_POINTS.map((point) => point.id), [
    "martinez", "beccar", "maschwitz", "tigre", "san-clemente",
  ]);
});

for (const point of ACTIVE_PICKUP_POINTS) {
  test(`genera el destinatario y mensaje correctos para ${point.label}`, () => {
    const buyer = { name: "Ana", phone: "11 1234-5678", email: "ana@example.com" };
    const url = new URL(buildWhatsAppUrl({ buyer, cart, pickupPoint: point, total: 42000 }));
    const message = url.searchParams.get("text");
    assert.equal(`${url.hostname}${url.pathname}`, `wa.me/${point.whatsapp}`);
    assert.match(message, new RegExp(`Hola ${point.contactName}`));
    assert.match(message, new RegExp(`Punto de retiro: ${point.label}`));
    assert.match(message, /2 × Pasta Lisa Blanca/);
    assert.match(message, /¿Qué fecha posible de retiro tienen\?/);
  });
}

test("rechaza un punto deshabilitado", () => {
  const olivos = PICKUP_POINTS.find((point) => point.id === "olivos");
  assert.throws(() => buildWhatsAppMessage({
    buyer: { name: "Ana", phone: "11 1234-5678" }, cart, pickupPoint: olivos, total: 42000,
  }), /no está habilitado/);
});

test("agrega la condición sólo cuando el pedido incluye Barbotina Canje", () => {
  const buyer = { name: "Ana", phone: "11 1234-5678" };
  const pickupPoint = ACTIVE_PICKUP_POINTS[0];
  const canjeCart = [{ id: "barbotina-canje", nombre: "Barbotina Canje bidón 9 kg", cantidad: 1, precio: 9500 }];
  const regularCart = [{ id: "barbotina", nombre: "Barbotina bidón 9 kg", cantidad: 1, precio: 12000 }];

  const canjeMessage = buildWhatsAppMessage({ buyer, cart: canjeCart, pickupPoint, total: 9500 });
  const regularMessage = buildWhatsAppMessage({ buyer, cart: regularCart, pickupPoint, total: 12000 });

  assert.match(canjeMessage, /Los bidones de 9 kg deben entregarse vacíos, limpios y en perfecto estado/);
  assert.doesNotMatch(regularMessage, /Condición de Barbotina Canje|vacíos, limpios y en perfecto estado/);
});

test("WhatsApp conserva cantidad y total de Gres Blanco", () => {
  const buyer = { name: "Ana", phone: "11 1234-5678" };
  const pickupPoint = ACTIVE_PICKUP_POINTS[0];
  const gresCart = [{ id: "pasta-gres-blanco", nombre: "Pasta Gres Blanco (bolsa 5 kg)", cantidad: 20, precio: 12500 }];
  const message = buildWhatsAppMessage({ buyer, cart: gresCart, pickupPoint, total: 250000 });
  assert.match(message, /20 × Pasta Gres Blanco \(bolsa 5 kg\)/);
  assert.match(message, /Total estimado:.*250\.000/);
  assert.doesNotMatch(message, /Condición de Barbotina Canje/);
});
