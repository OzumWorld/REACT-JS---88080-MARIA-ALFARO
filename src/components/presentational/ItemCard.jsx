
import { Link } from "react-router-dom";
export default function ItemCard({ prod }) {
  return (
    <article className="card">
      {/* ... */}
      <Link to={`/productos/item/${prod.id}`} className="btn">Ver detalle</Link>
    </article>
  );
}
