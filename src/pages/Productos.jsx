
import { useMemo, useState, useEffect } from "react";
import { CATALOGO, PRODUCT_INFO } from "../data/catalogo.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Productos() {
  const [tab, setTab] = useState("pasta");

  useEffect(() => {
    const last = localStorage.getItem("aa_tab") || "pasta";
    setTab(last);
  }, []);
  useEffect(() => {
    localStorage.setItem("aa_tab", tab);
  }, [tab]);

  const lista = useMemo(
    () => CATALOGO.filter((p) => p.tipo === tab),
    [tab]
  );

  return (
    <section className="card">
      <h2 id="productos">Productos & Fichas</h2>

      <div className="tabs" role="tablist" aria-label="categorías">
        <button
          className={`tab ${tab === "pasta" ? "is-active" : ""}`}
          role="tab"
          aria-selected={tab === "pasta"}
          onClick={() => setTab("pasta")}
        >
          Pastas
        </button>
        <button
          className={`tab ${tab === "barbotina" ? "is-active" : ""}`}
          role="tab"
          aria-selected={tab === "barbotina"}
          onClick={() => setTab("barbotina")}
        >
          Barbotinas
        </button>
      </div>

      <div className="fichas-grid">
        {lista.map((prod) => (
          <ProductCard
            key={prod.id}
            producto={prod}
            info={PRODUCT_INFO[prod.id]}
          />
        ))}
      </div>

      <hr style={{border:"0", height:1, background:"#e8e8e8", margin:"1.25rem 0"}} />

      <h3 id="usos">Usos (rápido)</h3>
      <p className="hint">
        Pastas: utilitario / artístico, modelado, placas, torno. Barbotinas: colada en moldes de yeso.
      </p>
    </section>
  );
}
