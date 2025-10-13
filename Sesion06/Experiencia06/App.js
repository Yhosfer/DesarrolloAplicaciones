import { HashRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>hola</h2>;
}

function About() {
  return <h2>adios</h2>;
}

function App() {
  return (
    <HashRouter>
      <nav style={{ display: "flex", gap: 12, padding: 16 }}>
        <Link to="/primero">primero</Link>
        <Link to="/segundo">segundo</Link>
      </nav>

      <Routes>
        <Route path="/primero" element={<Home />} />
        <Route path="/segundo" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

