import ItemCard from "./ItemCard";

export default function ItemList({ items }) {
  if (!items || items.length === 0) {
    return <p>No hay productos en esta categoría.</p>;
  }

  return (
    <div className="grid">
      {items.map((prod) => (
        <ItemCard key={prod.id} prod={prod} />
      ))}
    </div>
  );
}

