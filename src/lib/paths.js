// src/lib/paths.js

/**
 * Une una ruta dentro de /public con el BASE_URL de Vite.
 * Acepta "img/archivo.jpg" o "/img/archivo.jpg" (quita barras iniciales).
 * Hace encodeURI para soportar espacios en nombres de archivo.
 */
export function withBase(p) {
    if (!p) return "";
    const cleaned = String(p).replace(/^\/+/, ""); // quita "/" inicial
    return encodeURI(`${import.meta.env.BASE_URL}${cleaned}`);
  }
  