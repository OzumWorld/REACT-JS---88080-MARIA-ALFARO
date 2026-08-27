export const PICKUP_POINTS = [
  { id: "martinez", label: "Martínez", contactName: "Paola", whatsapp: "5491130413331", enabled: true },
  { id: "beccar", label: "Béccar", contactName: "Florencia", whatsapp: "5491155779275", enabled: true },
  { id: "maschwitz", label: "Maschwitz", contactName: "Agostina", whatsapp: "5491160429954", enabled: true },
  { id: "tigre", label: "Tigre", contactName: "Carlos", whatsapp: "5491149800005", enabled: true },
  { id: "san-clemente", label: "San Clemente del Tuyú", contactName: "María", whatsapp: "5491155634825", enabled: true },
  { id: "olivos", label: "Olivos", contactName: "Cynthia", whatsapp: null, enabled: false },
];

export const ACTIVE_PICKUP_POINTS = PICKUP_POINTS.filter(
  (point) => point.enabled && point.whatsapp
);

export function getPickupPointById(id) {
  return ACTIVE_PICKUP_POINTS.find((point) => point.id === id) ?? null;
}
