import { useState } from "react";

export default function ItemCount({ stock=0, initial=1, onAdd }) {
  const [qty, setQty] = useState(initial);
  return (
    <div className="counter" aria-label="Seleccionar cantidad">
      <div className="controls">
        <button type="button" aria-label="Disminuir cantidad" disabled={qty<=1} onClick={()=>setQty(qty-1)}>−</button>
        <output aria-live="polite">{qty}</output>
        <button type="button" aria-label="Aumentar cantidad" disabled={qty>=stock} onClick={()=>setQty(qty+1)}>+</button>
      </div>
      <button className="btn" disabled={stock === 0} onClick={()=>onAdd?.(qty)}>
        Agregar al carrito
      </button>
    </div>
  );
}
