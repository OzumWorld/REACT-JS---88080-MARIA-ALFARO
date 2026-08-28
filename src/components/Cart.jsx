import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { withBase } from "../lib/paths.js";
import { ACTIVE_PICKUP_POINTS } from "../config/pickupPoints.js";

export default function Cart() {
  const { cart, removeItem, clear, totalUnits, totalPrice } = useCart();
  const navigate = useNavigate();
  const [pickupPointId, setPickupPointId] = useState("");

  const continueToCheckout = (event) => {
    event.preventDefault();
    if (!pickupPointId) return;
    navigate("/checkout", { state: { pickupPointId } });
  };

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
              {p.commercialCondition && <div className="cart-item__condition">{p.commercialCondition}</div>}
            </div>

            <button className="text-button" onClick={() => removeItem(p.id)}>Quitar</button>
          </li>
        ))}
      </ul>

      <form className="cart-summary" onSubmit={continueToCheckout}>
        <div>
          <div><strong>Unidades:</strong> {totalUnits}</div>
          <div className="cart-summary__total">
            <strong>Total:</strong> {totalPrice.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
          </div>
        </div>
        <div className="cart-summary__actions">
          <label htmlFor="cart-pickup-point">Punto de retiro</label>
          <select id="cart-pickup-point" required value={pickupPointId} onChange={(event) => setPickupPointId(event.target.value)}>
            <option value="">Elegí dónde retirar</option>
            {ACTIVE_PICKUP_POINTS.map((point) => (
              <option key={point.id} value={point.id}>{point.label}</option>
            ))}
          </select>
          <small>El punto elegido te confirmará por WhatsApp una fecha posible.</small>
          <div className="button-row">
            <button className="btn btn--outline" type="button" onClick={clear}>Vaciar carrito</button>
            <button className="btn btn--gold" type="submit" disabled={!pickupPointId}>Continuar pedido</button>
          </div>
        </div>
      </form>
    </section>
  );
}
