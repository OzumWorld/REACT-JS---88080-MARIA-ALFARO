// src/App.jsx
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Sobre from "./pages/Sobre";
import NotFound from "./components/NotFound";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import SiteFooter from "./components/SiteFooter.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <NavBar />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/productos" element={<Productos />}>
            <Route index element={<ItemListContainer />} />
            <Route path="categoria/:catId" element={<ItemListContainer />} />
            <Route path="item/:id" element={<ItemDetailContainer />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
