const formatMoney = (value) =>
  Number(value).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

export function buildWhatsAppMessage({ buyer, cart, pickupPoint, total }) {
  if (!pickupPoint?.enabled || !pickupPoint?.whatsapp) {
    throw new Error("El punto de retiro seleccionado no está habilitado.");
  }
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("El pedido no tiene productos.");
  }

  const items = cart.map((item) => {
    const name = item.nombre || item.title || "Producto";
    const quantity = Number(item.cantidad) || 0;
    const unitPrice = Number(item.precio) || 0;
    return `• ${quantity} × ${name} — ${formatMoney(quantity * unitPrice)}`;
  });

  return [
    `Hola ${pickupPoint.contactName}, soy ${buyer.name}.`,
    "Quiero hacer este pedido de Arcillas Argentinas:",
    "",
    ...items,
    "",
    `Total estimado: ${formatMoney(total)}`,
    `Punto de retiro: ${pickupPoint.label}`,
    `Mi teléfono: ${buyer.phone}`,
    buyer.email ? `Mi email: ${buyer.email}` : null,
    "",
    "¿Qué fecha posible de retiro tienen?",
  ].filter((line) => line !== null).join("\n");
}

export function buildWhatsAppUrl(order) {
  const { pickupPoint } = order;
  const message = buildWhatsAppMessage(order);
  return `https://wa.me/${pickupPoint.whatsapp}?text=${encodeURIComponent(message)}`;
}
