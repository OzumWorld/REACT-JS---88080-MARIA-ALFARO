
import { Link } from "react-router-dom";
import { withBase } from "../../lib/paths.js";

export default function ItemCard({ prod }) {
  if (!prod) return null;

  return (
    <article className="card">
      {prod.img && (
        <img
          src={withBase(prod.img)}
          alt={prod.nombre}
          className="product-card__image"
          loading="lazy"
        />
      )}

      <h3>{prod.nombre}</h3>

      {prod.categoria && (
        <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
          <strong>Categoría:</strong> {prod.categoria}
        </p>
      )}

      {prod.precio !== undefined && (
        <p style={{ fontWeight: 700, color: "#f6cd4c", fontSize: "1rem" }}>
          {prod.precio.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </p>
      )}

      {prod.stock === 0 ? (
        <p className="badge">Sin stock</p>
      ) : (
        <Link to={`/productos/item/${prod.id}`} className="btn">
          Ver detalle
        </Link>
      )}
    </article>
  );
}
