export default function ProductCard({ producto, info, onAdd }) {
  const imgSrc = info?.img ? encodeURI(info.img) : null;
  const pdfHref = info?.pdf ? encodeURI(info.pdf) : null;

  return (
    <article className="ficha-card">
      <header className="ficha-card__head">{producto.nombre}</header>

      <div className="ficha-card__body">
        {imgSrc && <img src={imgSrc} alt={producto.nombre} style={{ width: '100%', height: 'auto' }} />}
        <p><strong>{producto.tipo === 'pasta' ? 'Pasta' : 'Barbotina'}</strong> · <strong>Cocción:</strong> {info?.coccion || '—'}</p>
        <p>{info?.resumen}</p>
        <ul className="hint">
          <li>1–9: {producto.precios.unidad.toLocaleString('es-AR',{style:'currency',currency:'ARS'})} (unidad)</li>
          <li>10–19: {producto.precios.pack10.toLocaleString('es-AR',{style:'currency',currency:'ARS'})} (pack ×10)</li>
          <li>20+: {producto.precios.pack20.toLocaleString('es-AR',{style:'currency',currency:'ARS'})} (pack ×20)</li>
        </ul>
      </div>

      <div className="ficha-card__actions">
        {pdfHref && <a className="btn" href={pdfHref} download>Ficha (PDF)</a>}
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => onAdd(producto.id)}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
