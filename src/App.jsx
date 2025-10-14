import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import NotFound from "./components/NotFound.jsx";
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

          <Route path="/productos/*" element={<Productos />}>
            <Route index element={<ItemListContainer />} />
            <Route path="categoria/:catId" element={<ItemListContainer />} />
            <Route path="item/:id" element={<ItemDetailContainer />} />
          </Route>

          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
