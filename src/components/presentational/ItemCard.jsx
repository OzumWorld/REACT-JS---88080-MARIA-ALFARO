
import { Link } from "react-router-dom";
import { withBase } from "../../lib/paths.js";

export default function ItemCard({ prod }) {
  if (!prod) return null;

  return (
    <article className="product-card">
      <Link className="product-card__media" to={`/productos/item/${prod.id}`} aria-label={`Ver ${prod.nombre}`}>
        {prod.img ? <img src={withBase(prod.img)} alt={prod.nombre} loading="lazy" /> : <span className="product-card__image-pending">Foto real pendiente de incorporación</span>}
        <span className="product-card__type">{prod.categoria === "pastas" ? "Pasta" : "Barbotina"}</span>
      </Link>
      <div className="product-card__body">
        <h2><Link to={`/productos/item/${prod.id}`}>{prod.nombre}</Link></h2>
        {prod.descripcion && <p className="product-card__description">{prod.descripcion}</p>}
        {prod.commercialCondition && (
          <p className="commercial-condition commercial-condition--compact">
            <strong>Condición de canje:</strong> {prod.commercialCondition}
          </p>
        )}
        {prod.coccion && <p className="product-card__data"><span>Cocción</span><strong>{prod.coccion}</strong></p>}
        {prod.precio !== undefined && <p className="price">{prod.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}</p>}
        {prod.precios && (
          <p className="product-card__tiers">10+: {prod.precios.pack10.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })} c/u{Number.isFinite(prod.precios.pack20) ? ` · 20+: ${prod.precios.pack20.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })} c/u` : ""}</p>
        )}
        <div className="product-card__actions">
          {prod.stock === 0 ? <p className="stock-status">Sin stock</p> : <Link to={`/productos/item/${prod.id}`} className="btn btn--ink">Ver detalle</Link>}
          {prod.pdf && <a className="icon-link" href={withBase(prod.pdf)} download aria-label={`Descargar ficha técnica de ${prod.nombre}`}>PDF <span aria-hidden="true">↓</span></a>}
          {prod.pendingDocument && <span className="document-pending">Ficha técnica en preparación</span>}
        </div>
      </div>
    </article>
  );
}
