import { NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";
import Brand from "./Brand.jsx";

const CATS = [
  { id: "pastas", label: "Pastas" },
  { id: "barbotinas", label: "Barbotinas" },
];

export default function NavBar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Brand compact />
        <nav className="nav__primary" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          {CATS.map(c => (
            <NavLink className="nav__category" key={c.id} to={`/productos/categoria/${c.id}`}>{c.label}</NavLink>
          ))}
          <NavLink to="/sobre">Nosotros</NavLink>
          <a href="#contacto">Contacto</a>
        </nav>
        <CartWidget />
      </div>
    </header>
  );
}
