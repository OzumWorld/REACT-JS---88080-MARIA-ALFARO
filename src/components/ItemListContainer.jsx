// src/components/ItemListContainer.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import ItemList from "./presentational/ItemList.jsx";
import { fetchProducts } from "../helpers/fetchData.js";

export default function ItemListContainer() {
  const { catId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    
    fetchProducts(catId)
      .then((list) => { if (alive) setItems(list); })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, [catId]);

  if (loading) return <Loader />;
  return (
    <section aria-live="polite">
      <p className="results-count">{items.length} {items.length === 1 ? "producto" : "productos"}</p>
      <ItemList items={items} />
    </section>
  );
}

