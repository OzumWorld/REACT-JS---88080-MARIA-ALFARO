// src/components/presentational/ItemDetail.jsx
import ItemCount from "./ItemCount.jsx";
// Si ya creaste el carrito, descomenta la línea de abajo y úsalo:
// import { useCart } from "../../context/CartContext.jsx";

export default function ItemDetail({ item }) {
  // const { addItem } = useCart(); // si usás contexto
  if (!item) return null;

  return (
    <div className="detail" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
      {item.img && (
        <img
          src={item.img}
          alt={item.nombre}
          style={{ width: "100%", borderRadius: 12 }}
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
          stock={99}
          initial={1}
          // Si usás contexto:
          // onAdd={(qty) => addItem(item, qty)}
          // Si todavía no:
          onAdd={(qty) => console.log("Agregar", qty, item.id)}
        />
      </div>
    </div>
  );
}
