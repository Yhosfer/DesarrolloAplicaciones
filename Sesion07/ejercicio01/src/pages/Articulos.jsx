import React from "react";
import { Link } from "react-router-dom";
import articulos from "../data/articulos";

function Articulos() {
    return (
        <div>
            <h2>Lista de Artículos</h2>
            <ul>
                {articulos.map((art) => (
                    <li key={art.id}>
                        <Link to={`/articulos/${art.id}`}>{art.titulo}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Articulos;
