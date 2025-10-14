import { PRODUCTS } from "../data/products";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function fetchProducts(category) {
  await delay(600); // retardo breve
  if (!category) return PRODUCTS;
  return PRODUCTS.filter(p => p.categoria === category);
}

export async function fetchProductById(id) {
  await delay(600);
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) throw new Error("Producto no encontrado");
  return prod;
}
