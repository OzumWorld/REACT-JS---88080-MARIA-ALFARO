import { PRODUCT_DOCUMENTS } from "../config/productDocuments.js";
import { withBase } from "../lib/paths.js";

export default function TechnicalSheets() {
  return (
    <section className="technical-sheets" aria-labelledby="technical-sheets-title">
      <div className="technical-sheets__heading">
        <div>
          <p className="eyebrow eyebrow--dark">Documentación original</p>
          <h2 id="technical-sheets-title">Fichas técnicas</h2>
        </div>
        <p>Diez documentos originales, asociados por el nombre exacto de cada material.</p>
      </div>
      <ul className="technical-sheets__grid">
        {PRODUCT_DOCUMENTS.map((document) => (
          <li key={document.productId}>
            <span aria-hidden="true">PDF</span>
            <div><strong>{document.productName}</strong><small>{document.fileName}</small></div>
            <a href={withBase(document.path)} download aria-label={`Descargar ficha técnica de ${document.productName}`}>Descargar <span aria-hidden="true">↓</span></a>
          </li>
        ))}
      </ul>
      <p className="technical-sheets__note">Barbotina Canje permanece sin ficha asociada hasta confirmar su documento original. Pasta Raku se ofrece aquí como documentación y no se incorpora automáticamente al catálogo comercial.</p>
    </section>
  );
}
