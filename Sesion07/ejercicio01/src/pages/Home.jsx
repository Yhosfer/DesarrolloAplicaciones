import React from "react";
import { useNavigate } from "react-router-dom";
import articulos from "../data/articulos";

function Home() {
    const navigate = useNavigate();

    const irArticuloAleatorio = () => {
        const randomIndex = Math.floor(Math.random() * articulos.length);
        const randomId = articulos[randomIndex].id;
        navigate(`/articulos/${randomId}`);
    };

    return (
        <div>
            <h1>Bienvenido al Blog</h1>
            <p>Explora nuestros artículos y aprende algo nuevo cada día.</p>
            <button onClick={irArticuloAleatorio}>Leer un Artículo Aleatorio</button>
        </div>
    );
}

export default Home;
