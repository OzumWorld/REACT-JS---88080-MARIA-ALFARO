import ItemCount from "./ItemCount.jsx";

export default function ItemDetail({ item }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(0);

  if (!item) return null;

  const handleAdd = (qty) => {
    addItem(item, qty);
    setAdded(qty);
  };

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
          onAdd={(qty) => console.log("Agregar", qty, item.id)}
        />
      </div>
    </div>
  );
}
