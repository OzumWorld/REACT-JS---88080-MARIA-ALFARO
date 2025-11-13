import { NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

const CATS = [
  { id: "pastas", label: "Pastas" },
  { id: "barbotinas", label: "Barbotinas" },
];

export default function NavBar() {
  return (
    <header className="nav">
      <NavLink to="/" className="brand">Arcillas Argentinas</NavLink>

      <nav className="links">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
      </nav>

      <nav className="links">
        {CATS.map(c => (
          <NavLink key={c.id} to={`/categoria/${c.id}`}>{c.label}</NavLink>
        ))}
      </nav>

      <CartWidget />
    </header>
  );
}
