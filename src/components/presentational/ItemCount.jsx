import { useState } from "react";

export default function ItemCount({ stock=0, initial=1, onAdd }) {
  const [qty, setQty] = useState(initial);
  return (
    <div className="counter">
      <div className="controls">
        <button disabled={qty<=1} onClick={()=>setQty(qty-1)}>-</button>
        <span>{qty}</span>
        <button disabled={qty>=stock} onClick={()=>setQty(qty+1)}>+</button>
      </div>
      <button className="btn" disabled={stock === 0} onClick={()=>onAdd?.(qty)}>
        Agregar al carrito
      </button>
    </div>
  );
}
