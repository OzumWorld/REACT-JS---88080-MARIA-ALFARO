import CartWidget from './CartWidget.jsx'
import { Link, NavLink } from "react-router-dom"

export default function NavBar(){
  return (
    <header className="nav">
      <Link to="/" className="logo">Arcillas Argentinas</Link>
      <nav className="nav__links" aria-label="principal">
        <NavLink to="/" className="nav__link">Inicio</NavLink>
        <NavLink to="/productos" className="nav__link">Productos</NavLink>
        <NavLink to="/productos#usos" className="nav__link">Usos</NavLink>
        <NavLink to="/sobre" className="nav__link">Quiénes somos</NavLink>
      </nav>
      <div className="nav__actions">
        <CartWidget count={0}/>
      </div>
    </header>
  )
}