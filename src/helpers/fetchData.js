import { db, isFirebaseConfigured } from "../firebase/config";
import { CATALOGO, PRODUCT_INFO } from "../data/catalogo.js";
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

const INFO_ALIASES = {
  "pasta-roja-fuego-directo": "pasta-fuego-directo",
  "pasta-gres-tostado-oscura": "pasta-gres-tostado-oscuro",
};

const localProducts = CATALOGO.map((product) => {
  const info = PRODUCT_INFO[INFO_ALIASES[product.id] || product.id] || {};
  return {
    id: product.id,
    nombre: product.nombre,
    precio: product.precios.unidad,
    categoria: product.tipo === "pasta" ? "pastas" : "barbotinas",
    descripcion: info.resumen,
    coccion: info.coccion,
    img: info.img,
    pdf: info.pdf,
    stock: 99,
  };
});

const getLocalProducts = (catId) =>
  catId ? localProducts.filter((product) => product.categoria === catId) : localProducts;

/**
 * Lista de productos (opcionalmente filtrada por categoría)
 * @param {string|undefined} catId
 * @returns {Promise<Array>}
 */
export async function fetchProducts(catId) {
  if (!isFirebaseConfigured) return getLocalProducts(catId);

  const ref = collection(db, "products");
  const q = catId ? query(ref, where("categoria", "==", catId)) : ref;
  try {
    const snap = await getDocs(q);
    const products = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return products.length ? products : getLocalProducts(catId);
  } catch {
    return getLocalProducts(catId);
  }
}

/**
 * Detalle de un producto por ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
  const localProduct = localProducts.find((product) => product.id === id);
  if (!isFirebaseConfigured) {
    if (!localProduct) throw new Error("Producto no encontrado");
    return localProduct;
  }

  const ref = doc(db, "products", id);
  try {
    const snap = await getDoc(ref);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch {
    // La ficha local mantiene disponible el catálogo si Firestore no responde.
  }
  if (localProduct) return localProduct;
  throw new Error("Producto no encontrado");
}

/**
 * Crear orden en Firestore
 * @param {Object} order - { buyer, items, total }
 * @returns {Promise<string>} id de la orden
 */
export async function createOrder(order) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase no está configurado en este entorno.");
  }
  const ref = collection(db, "orders");
  const docRef = await addDoc(ref, {
    ...order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}
