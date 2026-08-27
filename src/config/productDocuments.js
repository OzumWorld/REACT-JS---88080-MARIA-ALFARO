const FICHAS_BASE = "/fichas/";

export const PRODUCT_DOCUMENTS = Object.freeze([
  { productId: "barbotina", productName: "Barbotina bidón 9 kg", fileName: "Barbotina bidon 9 kg.pdf" },
  { productId: "barbotina-gres-tostado-oscuro", productName: "Barbotina para Gres bidón 9 kg", fileName: "Barbotina para Gres bidon 9 kg.pdf" },
  { productId: "pasta-blanca-con-chamote", productName: "Pasta Blanca con Chamote", fileName: "Pasta Blanca con Chamote.pdf" },
  { productId: "pasta-roja-fuego-directo", productName: "Pasta Fuego Directo", fileName: "Pasta Fuego Directo.pdf" },
  { productId: "pasta-gres-tostado-claro", productName: "Pasta Gres Tostado Claro", fileName: "Pasta Gres Tostado Claro.pdf" },
  { productId: "pasta-gres-tostado-oscura", productName: "Pasta Gres Tostado Oscuro", fileName: "Pasta Gres Tostado Oscuro.pdf" },
  { productId: "pasta-lisa-blanca", productName: "Pasta Lisa Blanca", fileName: "Pasta Lisa Blanca.pdf" },
  { productId: "pasta-raku", productName: "Pasta Raku", fileName: "Pasta Raku.pdf" },
  { productId: "pasta-roja-con-chamote", productName: "Pasta Roja con Chamote", fileName: "Pasta Roja con Chamote.pdf" },
  { productId: "pasta-roja", productName: "Pasta Roja", fileName: "Pasta Roja.pdf" },
].map((document) => Object.freeze({ ...document, path: `${FICHAS_BASE}${document.fileName}` })));

export function getProductDocument(productId) {
  return PRODUCT_DOCUMENTS.find((document) => document.productId === productId) ?? null;
}

export function getProductDocumentPath(productId) {
  return getProductDocument(productId)?.path ?? null;
}
