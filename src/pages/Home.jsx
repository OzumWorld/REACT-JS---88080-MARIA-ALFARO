
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero__top">
        <span className="badge">Distribuidores de Arcillas Chilavert</span>
        <div className="logo">ARCILLAS<br/><strong>ARGENTINAS</strong></div>
      </div>
      <div className="hero__copy">
        <h1>Arcillas Argentinas</h1>
        <p className="lead">Las mejores pastas y barbotinas para crear lo que deseas.</p>

        <div style={{display:"flex", gap:"0.5rem", flexWrap:"wrap"}}>
          <Link className="btn" to="/productos">Productos</Link>
          <a className="btn btn--ghost" href="/productos#usos">Usos</a>
          <Link className="btn btn--ghost" to="/sobre">Quiénes somos</Link>
        </div>
      </div>
    </section>
  );
}

