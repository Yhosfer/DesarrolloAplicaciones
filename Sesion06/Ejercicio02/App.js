import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Roster from "./components/Roster"; // Exp 04: estado+form en clase
import Api from "./components/Api";       // Exp 05: fetch en clase

export default function App() {
  return (
    <HashRouter>
      <header style={{ display: "flex", gap: 12, padding: 16 }}>
        <Link to="/home">Inicio</Link>
        <Link to="/roster">Lista</Link>
        <Link to="/datos">Datos</Link>
        <Link to="/about">Acerca</Link>
      </header>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/datos" element={<Api />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
