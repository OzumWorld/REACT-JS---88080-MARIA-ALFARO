// src/lib/cart.js
export const STORAGE_KEY = 'aa_carrito_v1';

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addItem(productoId, cantidad = 1, nota = '') {
  const cart = loadCart();
  const i = cart.findIndex(it => it.productoId === productoId && it.nota === nota);
  if (i >= 0) cart[i].cantidad += cantidad;
  else cart.push({ productoId, cantidad, nota });
  saveCart(cart);
  return cart;
}
