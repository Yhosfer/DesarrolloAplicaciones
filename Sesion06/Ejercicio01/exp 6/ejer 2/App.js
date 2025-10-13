import { HashRouter, Routes, Route, Link, Outlet, useParams } from "react-router-dom";

function Inicio() {
  return (
    <section>
      <h2>Inicio</h2>
      <p>Bienvenido. Elige un perfil:</p>
      <ul>
        <li><Link to="/perfil/jimy">/perfil/jimy</Link></li>
        <li><Link to="/perfil/neutron">/perfil/neutron</Link></li>
      </ul>
    </section>
  );
}

function Acerca() {
  return <h2>Acerca</h2>;
}

function PerfilLayout() {

  const { usuario } = useParams();
  return (
    <section>
      <h2>Perfil de: {usuario}</h2>
      <nav style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Link to="">Resumen</Link>
        <Link to="preferencias">Preferencias</Link>
      </nav>
      <Outlet />
    </section>
  );
}

function PerfilResumen() {
  return <p>Este es el resumen del perfil zzzzz.</p>;
}

function PerfilPreferencias() {
  return <p>Aquí van las preferencias del usuario, rosaditas.</p>;
}

function NoEncontrado() {
  return <h2>404 — Página no encontrada</h2>;
}

export default function App() {
  return (
    <HashRouter>
      <header style={{ display: "flex", gap: 12, padding: 16 }}>
        <Link to="/inicio">Inicio</Link>
        <Link to="/acerca">Acerca</Link>
      </header>

      <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/acerca" element={<Acerca />} />

        {/* Ruta con parámetro + rutas anidadas */}
        <Route path="/perfil/:usuario" element={<PerfilLayout />}>
          <Route index element={<PerfilResumen />} />
          <Route path="preferencias" element={<PerfilPreferencias />} />
        </Route>


        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </HashRouter>
  );
}
