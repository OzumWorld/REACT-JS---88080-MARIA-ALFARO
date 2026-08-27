export const BARBOTINA_CANJE_ID = "barbotina-canje";

export const BARBOTINA_CANJE_CONDITION =
  "Los bidones de 9 kg deben entregarse vacíos, limpios y en perfecto estado.";

export const COMMERCIAL_EVIDENCE = {
  sourceFile: "PHOTO-2026-08-07-10-58-32.jpg",
  sourceLabel: "Lista de María",
  validAsOf: "agosto de 2026",
};

export const cartIncludesBarbotinaCanje = (cart = []) =>
  cart.some((product) => product.id === BARBOTINA_CANJE_ID);
