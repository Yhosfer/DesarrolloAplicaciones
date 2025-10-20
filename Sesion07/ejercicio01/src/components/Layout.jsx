import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
    return (
        <div>
            <nav style={{ background: "#222", color: "#fff", padding: "10px" }}>
                <ul style={{ display: "flex", gap: "15px", listStyle: "none" }}>
                    <li><Link to="/" style={{ color: "#fff" }}>Inicio</Link></li>
                    <li><Link to="/articulos" style={{ color: "#fff" }}>Artículos</Link></li>
                </ul>
            </nav>

            <main style={{ padding: "20px" }}>
                <Outlet />
            </main>

            <footer style={{ background: "#222", color: "#fff", textAlign: "center", padding: "10px" }}>
                <p>© 2025 Mi Blog. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default Layout;
