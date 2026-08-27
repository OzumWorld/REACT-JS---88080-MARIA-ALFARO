import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { withBase } from "../lib/paths.js";

export default function Cart() {
  const { cart, removeItem, clear, totalUnits, totalPrice } = useCart();

  if (!cart.length) {
    return (
      <section className="section container empty-state">
        <p className="eyebrow eyebrow--dark">Tu pedido</p>
        <h1>El carrito está vacío.</h1>
        <p>Recorré el catálogo y agregá los materiales que necesitás.</p>
        <Link className="btn btn--ink" to="/productos">Ir al catálogo</Link>
      </section>
    );
  }

  return (
    <section className="section container cart-page">
      <header className="page-heading page-heading--compact">
        <p className="eyebrow eyebrow--dark">Tu pedido</p>
        <h1>Carrito</h1>
      </header>

      <ul className="cart-list">
        {cart.map((p) => (
          <li key={p.id} className="cart-item">
            {p.img ? (
              <img src={withBase(p.img)} alt={p.nombre} />
            ) : (
              <div className="cart-item__placeholder" />
            )}

            <div>
              <strong>{p.nombre}</strong>
              <div className="cart-item__meta">
                {p.cantidad} x {p.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              </div>
              <div className="cart-item__subtotal">
                Subtotal: {(p.cantidad * p.precio).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              </div>
            </div>

            <button className="text-button" onClick={() => removeItem(p.id)}>Quitar</button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <div>
          <div><strong>Unidades:</strong> {totalUnits}</div>
          <div className="cart-summary__total">
            <strong>Total:</strong> {totalPrice.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
          </div>
        </div>
        <div className="button-row">
          <button className="btn btn--outline" onClick={clear}>Vaciar carrito</button>
          <Link className="btn btn--clay" to="/checkout">Elegir retiro y enviar</Link>
        </div>
      </div>
    </section>
  );
}
