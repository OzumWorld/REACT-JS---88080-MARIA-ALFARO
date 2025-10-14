// src/components/ProductCard.jsx
// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { withBase } from "../lib/paths.js";

export default function ProductCard({ producto, info, onAdd }) {
  const detalleHref = `/productos/item/${encodeURIComponent(producto.id)}`;
  const imgSrc  = info?.img ? withBase(info.img) : null;
  const pdfHref = info?.pdf ? withBase(info.pdf) : null;

  return (
    <article className="ficha-card">
      <div className="ficha-card__head">
        <Link to={detalleHref}>{producto.nombre}</Link>
      </div>

      <div className="ficha-card__body">
        {imgSrc && (
          <Link to={detalleHref}>
            <img
              src={imgSrc}
              alt={producto.nombre}
              style={{ width: "100%", height: "auto", display: "block" }}
              loading="lazy"
            />
          </Link>
        )}

        <p className="ficha-card__meta">
          <span className="ficha-chip">
            {producto.tipo === "pasta" ? "Pasta" : "Barbotina"}
          </span>
          {info?.coccion ? <> · <strong>Cocción:</strong> {info.coccion}</> : null}
        </p>

        {info?.resumen && <p>{info.resumen}</p>}

        <ul className="hint" style={{ marginTop: ".25rem" }}>
          <li>1–9: {producto.precios.unidad.toLocaleString("es-AR", { style:"currency", currency:"ARS" })} (unidad)</li>
          <li>10–19: {producto.precios.pack10.toLocaleString("es-AR", { style:"currency", currency:"ARS" })} (pack ×10)</li>
          <li>20+: {producto.precios.pack20.toLocaleString("es-AR", { style:"currency", currency:"ARS" })} (pack ×20)</li>
        </ul>
      </div>

      <div className="ficha-card__actions">
        {pdfHref && <a className="btn" href={pdfHref} download>Ficha (PDF)</a>}

        <Link className="btn btn--ghost" to={detalleHref}>
          Ver detalle
        </Link>

        <button type="button" className="btn btn--ghost" onClick={() => onAdd(producto.id)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}

