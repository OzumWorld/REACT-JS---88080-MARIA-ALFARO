import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
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
          p.id === item.id
            ? { ...p, cantidad: Math.min(p.cantidad + qty, item.stock) }
            : p
        );
      }
      return [...prev, { ...item, cantidad: qty }];
    });
  };

  const removeItem = (id) => setCart(cart.filter((p) => p.id !== id));
  const clear = () => setCart([]);
  const totalUnits = cart.reduce((acc, p) => acc + p.cantidad, 0);
  const totalPrice = cart.reduce((acc, p) => acc + p.cantidad * p.precio, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clear, totalUnits, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
