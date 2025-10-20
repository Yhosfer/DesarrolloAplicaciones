import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div>
            <h2>Error 404</h2>
            <p>Página no encontrada.</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}

export default NotFoundPage;
