import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function CartWidget() {
  const { totalUnits } = useCart(); // viene del Context

  return (
    <Link to="/cart" className="nav__cart" aria-label={`Carrito con ${totalUnits} unidades`}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 7H7M9 20h.01M17 20h.01" /></svg>
      <span className="nav__cart-label">Pedido</span>
      <span className="cart__badge">{totalUnits}</span>
    </Link>
  );
}

