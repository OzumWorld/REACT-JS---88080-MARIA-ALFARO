import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { cart, removeItem, clear, totalUnits, totalPrice } = useCart();

  if (!cart.length) {
    return (
      <section className="container card">
        <h2>Tu carrito está vacío</h2>
        <Link className="btn" to="/">Ir al catálogo</Link>
      </section>
    );
  }

  return (
    <section className="container">
      <h1>Carrito</h1>

      <ul className="list" style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
        {cart.map((p) => (
          <li key={p.id} className="card" style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "12px", alignItems: "center" }}>
            {p.img ? (
              <img src={p.img} alt={p.nombre} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
            ) : (
              <div style={{ width: 80, height: 80, background: "#223", borderRadius: 8 }} />
            )}

            <div>
              <strong>{p.nombre}</strong>
              <div style={{ opacity: 0.8, fontSize: 14 }}>
                {p.cantidad} x {p.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              </div>
              <div style={{ fontWeight: 700 }}>
                Subtotal: {(p.cantidad * p.precio).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              </div>
            </div>

            <button className="btn btn--ghost" onClick={() => removeItem(p.id)}>Quitar</button>
          </li>
        ))}
      </ul>

      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <div><strong>Unidades:</strong> {totalUnits}</div>
          <div style={{ fontSize: 18 }}>
            <strong>Total:</strong> {totalPrice.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--ghost" onClick={clear}>Vaciar carrito</button>
          <Link className="btn" to="/checkout">Ir a pagar</Link>
        </div>
      </div>
    </section>
  );
}
