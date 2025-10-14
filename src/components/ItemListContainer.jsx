import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../helpers/fetchData.js";
import Loader from "./Loader.jsx";
import ItemList from "./presentational/ItemList.jsx";

export default function ItemListContainer() {
  const { catId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts(catId)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [catId]);

  if (loading) return <Loader />;
  return (
    <section>
      <ItemList items={items} />
    </section>
  );
}

