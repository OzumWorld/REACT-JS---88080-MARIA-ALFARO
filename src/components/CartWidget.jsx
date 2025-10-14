// src/components/CartWidget.jsx
import { useEffect, useState } from 'react';
import { loadCart } from '../lib/cart.js';

export default function CartWidget() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(loadCart().reduce((acc, it) => acc + it.cantidad, 0));
  }, []);
  return (
    <div className="nav__cart">
      🛒 <span className="badge">{count}</span>
    </div>
  );
}
