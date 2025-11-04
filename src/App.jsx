import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Sobre from "./pages/Sobre";
import NotFound from "./components/NotFound";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  useEffect(() => {
    async function testFirestore() {
      try {
        const snap = await getDocs(collection(db, "products"));
        console.log("✅ Conectado a Firestore. Documentos:", snap.size);
      } catch (err) {
        console.error("❌ Error al conectar con Firestore:", err);
      }
    }
    testFirestore();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/productos" element={<Productos />}>
            <Route index element={<ItemListContainer />} />
            <Route path="categoria/:catId" element={<ItemListContainer />} />
            <Route path="item/:id" element={<ItemDetailContainer />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
