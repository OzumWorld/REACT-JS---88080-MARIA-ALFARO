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
    <div className="detail">
      {item.img && (
        <img
          src={withBase(item.img)}
          alt={item.nombre}
          className="detail__image"
          loading="lazy"
        />
      )}

      <div>
        <h2>{item.nombre}</h2>

        {item.categoria && (
          <p style={{ opacity: 0.85 }}>
            <strong>Categoría:</strong> {item.categoria}
          </p>
        )}

        {typeof item.precio !== "undefined" && (
          <p style={{ fontWeight: 700, fontSize: 18, margin: "8px 0 16px" }}>
            {item.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
          </p>
        )}

        {item.descripcion && <p>{item.descripcion}</p>}

        <ItemCount
          stock={item.stock ?? 99}
          initial={1}
          onAdd={handleAdd}
        />
        {added > 0 && (
          <p className="cart-confirmation" role="status">
            Agregaste {added} {added === 1 ? "unidad" : "unidades"}. <Link to="/cart">Ver pedido</Link>
          </p>
        )}
      </div>
    </div>
  );
}
