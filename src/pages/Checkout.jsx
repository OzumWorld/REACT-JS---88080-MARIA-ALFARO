import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { createOrder } from "../helpers/fetchData.js";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cart, totalPrice, clear } = useCart();
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (orderId) {
    return (
      <section className="card">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu ID de orden es:</p>
        <p className="badge" style={{ fontSize: "1.1rem" }}>{orderId}</p>
        <Link className="btn" to="/">Volver al inicio</Link>
      </section>
    );
  }

  if (!cart.length) {
    return (
      <section className="card">
        <p>Carrito vacío.</p>
        <Link className="btn" to="/">Ir al catálogo</Link>
      </section>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const items = cart.map((p) => ({
        id: p.id,
        title: p.nombre || p.title,
        precio: p.precio,
        cantidad: p.cantidad,
      }));
      const id = await createOrder({ buyer, items, total: totalPrice });
      clear();
      setOrderId(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1>Checkout</h1>
      <form onSubmit={submit} className="row" style={{ flexDirection: "column", gap: ".6rem", maxWidth: 480 }}>
        <label>Nombre
          <input required value={buyer.name} onChange={e=>setBuyer(v=>({ ...v, name:e.target.value }))}/>
        </label>
        <label>Email
          <input type="email" required value={buyer.email} onChange={e=>setBuyer(v=>({ ...v, email:e.target.value }))}/>
        </label>
        <label>Teléfono
          <input required value={buyer.phone} onChange={e=>setBuyer(v=>({ ...v, phone:e.target.value }))}/>
        </label>
        <button className="btn" disabled={loading}>{loading ? "Procesando…" : "Confirmar compra"}</button>
        {error && <small className="muted">{error}</small>}
      </form>
    </section>
  );
}
