import { useCart } from "../context/CartContext.jsx";

export default function CartWidget() {
  const { totalUnits } = useCart(); // viene del Context

  return (
    <div className="nav__cart" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span role="img" aria-label="Carrito">🛒</span>
      <span className="badge">{totalUnits}</span>
    </div>
  );
}



