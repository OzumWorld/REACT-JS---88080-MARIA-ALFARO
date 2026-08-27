export function getUnitPriceForQuantity(product, quantity) {
  const units = Math.max(1, Number(quantity) || 1);
  const tiers = product?.precios;

  if (!tiers) return Number(product?.precio) || 0;
  if (units >= 20) return Number(tiers.pack20);
  if (units >= 10) return Number(tiers.pack10);
  return Number(tiers.unidad);
}

export function calculateCartTotal(cart = []) {
  return cart.reduce(
    (total, product) => total + (Number(product.cantidad) || 0) * (Number(product.precio) || 0),
    0,
  );
}
