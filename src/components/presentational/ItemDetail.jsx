import ItemCount from "./ItemCount.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { withBase } from "../../lib/paths.js";

export default function ItemDetail({ item }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(0);

  if (!item) return null;

  const handleAdd = (qty) => {
    addItem(item, qty);
    setAdded(qty);
  };

  return (
    <article className="detail">
      <div className="detail__media">
        {item.img ? <img src={withBase(item.img)} alt={item.nombre} loading="eager" /> : <div className="detail__image-pending">Foto real pendiente de incorporación</div>}
      </div>
      <div className="detail__content">
        <Link className="back-link" to="/productos">← Volver al catálogo</Link>
        <p className="eyebrow eyebrow--dark">{item.categoria === "pastas" ? "Pasta cerámica" : "Barbotina"}</p>
        <h1>{item.nombre}</h1>
        {item.descripcion && <p className="detail__lead">{item.descripcion}</p>}
        {item.commercialCondition && (
          <aside className="commercial-condition" aria-label="Condición de canje">
            <strong>Condición de canje</strong>
            <span>{item.commercialCondition}</span>
          </aside>
        )}
        <dl className="technical-summary">
          {item.coccion && <div><dt>Rango de cocción disponible</dt><dd>{item.coccion}</dd></div>}
          <div><dt>Presentación</dt><dd>{item.nombre.match(/\(([^)]+)\)|(?:bidón|bolsa) [0-9]+ kg/i)?.[1] || item.nombre.match(/(?:bidón|bolsa) [0-9]+ kg/i)?.[0] || "Consultar"}</dd></div>
        </dl>
        {typeof item.precio !== "undefined" && <p className="price price--large">{item.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}</p>}
        {item.precios && (
          <dl className="price-tiers" aria-label="Precios por cantidad">
            <div><dt>1 a 9 unidades</dt><dd>{item.precios.unidad.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })} c/u</dd></div>
            <div><dt>Desde 10 unidades</dt><dd>{item.precios.pack10.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })} c/u</dd></div>
            {Number.isFinite(item.precios.pack20) && <div><dt>Desde 20 unidades</dt><dd>{item.precios.pack20.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })} c/u</dd></div>}
          </dl>
        )}
        {item.pdf && <a className="pdf-download" href={withBase(item.pdf)} download><span aria-hidden="true">PDF</span><span><strong>Descargar ficha técnica</strong><small>Documento en formato PDF</small></span><span aria-hidden="true">↓</span></a>}
        {item.pendingDocument && (
          <aside className="pending-sheet" aria-label="Ficha técnica en preparación">
            <strong>Ficha técnica en preparación</strong>
            <span>No se publicarán datos técnicos hasta contar con información confirmada.</span>
            <small>Campos pendientes: {item.pendingDocument.pendingFields.join(", ")}.</small>
          </aside>
        )}
        <ItemCount stock={item.stock ?? 99} initial={1} onAdd={handleAdd} />
        {added > 0 && (
          <p className="cart-confirmation" role="status">
            Agregaste {added} {added === 1 ? "unidad" : "unidades"}. <Link to="/cart">Ver pedido</Link>
          </p>
        )}
      </div>
    </article>
  );
}
