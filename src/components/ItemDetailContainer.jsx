import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../helpers/fetchData.js";
import Loader from "./Loader.jsx";
import ItemDetail from "./presentational/ItemDetail.jsx";

export default function ItemDetailContainer() {
  const { id: rawId } = useParams();
  const id = rawId ? decodeURIComponent(rawId) : ""; 

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;          
    setLoading(true);
    setError("");

    fetchProductById(String(id)) 
      .then(setItem)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error)   return <p className="error">{error}</p>;
  if (!item)   return <p>No encontrado.</p>;

  return <ItemDetail item={item} />;
}

