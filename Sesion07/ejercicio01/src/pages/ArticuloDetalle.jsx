import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import articulos from "../data/articulos";

function ArticuloDetalle() {
    const { id } = useParams();
    const articulo = articulos.find((a) => a.id === parseInt(id));

    if (!articulo) return <p>Artículo no encontrado.</p>;

    return (
        <div>
            <h2>{articulo.titulo}</h2>
            <p>{articulo.contenido}</p>

            <hr />
            <Link to="autor">Sobre el Autor</Link>

            <div style={{ marginTop: "15px" }}>
                <Outlet />
            </div>
        </div>
    );
}

export default ArticuloDetalle;
