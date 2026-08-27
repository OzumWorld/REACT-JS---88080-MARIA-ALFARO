// src/pages/Productos.jsx
import { NavLink, Outlet } from "react-router-dom";
import TechnicalSheets from "../components/TechnicalSheets.jsx";

export default function Productos() {
  return (
    <section className="section container products-page">
      <header className="page-heading">
        <p className="eyebrow eyebrow--dark">Catálogo</p>
        <h1>Pastas y barbotinas</h1>
        <p>Consultá la presentación, el precio y la información disponible de cada material. Las fichas técnicas pueden descargarse desde el detalle del producto.</p>
        <nav className="filter-nav" aria-label="Filtrar productos por categoría">
          <NavLink to="/productos" end>Todos</NavLink>
          <NavLink to="/productos/categoria/pastas">Pastas</NavLink>
          <NavLink to="/productos/categoria/barbotinas">Barbotinas</NavLink>
        </nav>
      </header>
      <Outlet />
      <TechnicalSheets />
    </section>
  );
}
