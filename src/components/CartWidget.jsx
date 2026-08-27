import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function CartWidget() {
  const { totalUnits } = useCart(); // viene del Context

  return (
    <Link to="/cart" className="nav__cart" aria-label={`Carrito con ${totalUnits} unidades`}>
      <span role="img" aria-label="Carrito">🛒</span>
      <span className="badge">{totalUnits}</span>
    </Link>
  );
}


