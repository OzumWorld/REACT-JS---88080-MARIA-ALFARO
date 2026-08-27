
import { Link } from "react-router-dom";
import { ACTIVE_PICKUP_POINTS } from "../config/pickupPoints.js";
import { withBase } from "../lib/paths.js";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__layout">
          <div className="hero__copy">
            <p className="eyebrow">Distribuidores de Arcillas Chilavert</p>
            <h1>Materiales para darle forma a tus ideas.</h1>
            <p className="lead">Pastas y barbotinas para ceramistas, talleres y escuelas, con atención cercana y puntos de retiro en Buenos Aires y la Costa Atlántica.</p>
            <div className="button-row">
              <Link className="btn btn--clay" to="/productos">Explorar productos</Link>
              <a className="btn btn--outline-light" href="#retiros">Ver puntos de retiro</a>
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <img src={withBase("/img/Pasta Lisa Blanca.jpg")} alt="" />
            <div className="hero__stamp"><span>Arcillas</span><strong>Chilavert</strong></div>
          </div>
        </div>
      </section>

      <section className="intro-band" aria-label="Nuestra manera de trabajar">
        <div className="container intro-band__grid">
          <p className="intro-band__quote">“Donde la tierra se transforma en forma, allí nace la paciencia del fuego.”</p>
          <div className="intro-band__facts">
            <div><strong>Pastas</strong><span>Distintas presentaciones</span></div>
            <div><strong>Barbotinas</strong><span>En bidones de 9 kg</span></div>
            <div><strong>Pedido simple</strong><span>Coordinación por WhatsApp</span></div>
          </div>
        </div>
      </section>

      <section className="section container" id="retiros" aria-labelledby="retiros-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow eyebrow--dark">Elegí el más cercano</p>
            <h2 id="retiros-title">Puntos de retiro</h2>
          </div>
          <p>Armá tu pedido, seleccioná un punto y el contacto correspondiente te informará una fecha posible de retiro.</p>
        </div>
        <ul className="pickup-grid">
          {ACTIVE_PICKUP_POINTS.map((point, index) => (
            <li key={point.id}>
              <span aria-hidden="true">0{index + 1}</span>
              <strong>{point.label}</strong>
              <small>Contacto: {point.contactName}</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--cta">
        <div className="container cta-panel">
          <div>
            <p className="eyebrow eyebrow--dark">Tu próximo proyecto empieza acá</p>
            <h2>Conocé el catálogo y descargá las fichas técnicas.</h2>
          </div>
          <Link className="btn btn--ink" to="/productos">Ver catálogo completo</Link>
        </div>
      </section>
    </>
  );
}
