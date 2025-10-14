import { createContext, useContext, useMemo, useState } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, producto, qty}]

  const addItem = (producto, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === producto.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { id: producto.id, producto, qty }];
    });
  };

  const value = useMemo(() => ({ items, addItem }), [items]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
