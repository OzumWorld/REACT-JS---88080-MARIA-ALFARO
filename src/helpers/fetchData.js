import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Lista de productos (opcionalmente filtrada por categoría)
 * @param {string|undefined} catId
 * @returns {Promise<Array>}
 */
export async function fetchProducts(catId) {
  const ref = collection(db, "products");
  const q = catId ? query(ref, where("categoria", "==", catId)) : ref;
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Detalle de un producto por ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Producto no encontrado");
  return { id: snap.id, ...snap.data() };
}

/**
 * Crear orden en Firestore
 * @param {Object} order - { buyer, items, total }
 * @returns {Promise<string>} id de la orden
 */
export async function createOrder(order) {
  const ref = collection(db, "orders");
  const docRef = await addDoc(ref, {
    ...order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
