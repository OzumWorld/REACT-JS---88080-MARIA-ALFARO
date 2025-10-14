// src/pages/Productos.jsx
import { Outlet } from "react-router-dom";

export default function Productos() {
  return (
    <section className="container">
      <h1>Productos</h1>
      <Outlet />
    </section>
  );
}
