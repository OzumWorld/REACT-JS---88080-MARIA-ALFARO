import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import Sobre from "./pages/Sobre.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Si querés mantener el saludo del ItemListContainer en Home, lo dejas; para productos usamos la página nueva */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>
    </>
  );
}
