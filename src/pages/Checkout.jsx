import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { createOrder } from "../helpers/fetchData.js";
import { ACTIVE_PICKUP_POINTS, getPickupPointById } from "../config/pickupPoints.js";
import { buildWhatsAppUrl } from "../lib/whatsappOrder.js";

export default function Checkout() {
  const { cart, totalPrice, clear } = useCart();
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [pickupPointId, setPickupPointId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!cart.length) {
    return (
      <section className="container card">
        <p>Tu pedido está vacío.</p>
        <Link className="btn" to="/productos">Ir al catálogo</Link>
      </section>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const pickupPoint = getPickupPointById(pickupPointId);
      if (!pickupPoint) throw new Error("Elegí un punto de retiro habilitado.");

      const items = cart.map((product) => ({
        id: product.id,
        title: product.nombre || product.title,
        precio: product.precio,
        cantidad: product.cantidad,
      }));
      const whatsappUrl = buildWhatsAppUrl({ buyer, cart, pickupPoint, total: totalPrice });

      createOrder({
        buyer,
        items,
        total: totalPrice,
        pickupPoint: {
          id: pickupPoint.id,
          label: pickupPoint.label,
          contactName: pickupPoint.contactName,
        },
        channel: "whatsapp",
      }).catch((orderError) => {
        console.warn("No se pudo registrar el pedido en Firestore:", orderError);
      });

      clear();
      window.location.assign(whatsappUrl);
    } catch (submitError) {
      setError(submitError.message);
      setLoading(false);
    }
  };

  return (
    <section className="container checkout">
      <div className="card">
        <h1>Completá tu pedido</h1>
        <p>Elegí dónde retirarlo. El punto seleccionado te informará por WhatsApp una fecha posible.</p>

        <form onSubmit={submit} className="checkout__form">
          <label>Nombre
            <input autoComplete="name" required value={buyer.name} onChange={(event) => setBuyer((value) => ({ ...value, name: event.target.value }))} />
          </label>
          <label>Email
            <input type="email" autoComplete="email" required value={buyer.email} onChange={(event) => setBuyer((value) => ({ ...value, email: event.target.value }))} />
          </label>
          <label>Teléfono
            <input type="tel" autoComplete="tel" required value={buyer.phone} onChange={(event) => setBuyer((value) => ({ ...value, phone: event.target.value }))} />
          </label>
          <label>Punto de retiro
            <select required value={pickupPointId} onChange={(event) => setPickupPointId(event.target.value)}>
              <option value="">Seleccioná una opción</option>
              {ACTIVE_PICKUP_POINTS.map((point) => (
                <option key={point.id} value={point.id}>{point.label}</option>
              ))}
            </select>
          </label>

          <div className="checkout__summary">
            <strong>Total estimado</strong>
            <span>{totalPrice.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</span>
          </div>
          <button className="btn" disabled={loading}>{loading ? "Preparando…" : "Enviar pedido por WhatsApp"}</button>
          {error && <p className="error" role="alert">{error}</p>}
        </form>
      </div>
    </section>
  );
}
