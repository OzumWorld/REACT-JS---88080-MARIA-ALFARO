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
// src/helpers/fetchData.js
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

// ---- Productos ----
const productsCol = collection(db, "products");

/**
 * Trae productos. Si viene catId, filtra por categoría.
 * @param {string} [catId]
 * @returns {Promise<Array>}
 */
export async function fetchProducts(catId) {
  const q = catId ? query(productsCol, where("categoria", "==", catId)) : productsCol;
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Trae un producto por id de documento.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Producto no encontrado");
  return { id: snap.id, ...snap.data() };
}

// ---- Ordenes / Checkout ----
const ordersCol = collection(db, "orders");

/**
 * Crea una orden en Firestore. Devuelve el ID del documento.
 * @param {{buyer:{name:string,email:string,phone:string}, items:Array<{id:string,title?:string,nombre?:string,precio:number,cantidad:number}>, total:number}} order
 * @returns {Promise<string>}
 */
export async function createOrder(order) {
  const payload = { ...order, createdAt: serverTimestamp() };
  const ref = await addDoc(ordersCol, payload);
  return ref.id;
}
