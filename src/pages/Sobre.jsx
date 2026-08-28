export default function Sobre(){
    return (
      <section className="section container about-page">
        <div className="about-card">
          <div>
            <p className="eyebrow eyebrow--dark">Nuestro oficio</p>
            <h1>Materiales que acompañan procesos creativos.</h1>
          </div>
          <div className="about-card__copy">
          <p>
            En <strong>Arcillas Argentinas</strong> distribuimos Arcillas Chilavert: pastas y barbotinas para cerámica.
            Acompañamos a talleres, escuelas y artistas con productos confiables y asesoramiento cercano.
          </p>
          <p>Cada pedido se coordina directamente con el punto de retiro elegido, para que puedas consultar una fecha posible por WhatsApp.</p>
          <a className="text-link" href="#contacto">Hacer una consulta <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>
    )
  }
