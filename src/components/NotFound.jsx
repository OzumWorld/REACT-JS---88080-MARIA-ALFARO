import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <section className="container">
      <h2>404 — Página no encontrada</h2>
      <p>El recurso solicitado no existe o el enlace está mal formado.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </section>
  );
}
