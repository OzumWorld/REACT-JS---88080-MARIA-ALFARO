import { createContext, useContext, useState, useEffect } from "react";
import { calculateCartTotal, getUnitPriceForQuantity } from "../lib/pricing.js";

const CartContext = createContext();
// El hook comparte este módulo con el provider para conservar la API existente.
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item, qty) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? (() => {
            const cantidad = Math.min(p.cantidad + qty, item.stock);
            return { ...p, cantidad, precio: getUnitPriceForQuantity({ ...p, ...item }, cantidad) };
          })() : p
        );
      }
      return [...prev, { ...item, cantidad: qty, precio: getUnitPriceForQuantity(item, qty) }];
    });
  };

  const removeItem = (id) => setCart(cart.filter((p) => p.id !== id));
  const clear = () => setCart([]);
  const totalUnits = cart.reduce((acc, p) => acc + p.cantidad, 0);
  const totalPrice = calculateCartTotal(cart);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clear, totalUnits, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
