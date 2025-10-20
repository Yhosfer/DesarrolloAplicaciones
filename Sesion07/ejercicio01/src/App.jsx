import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Articulos from "./pages/Articulos";
import ArticuloDetalle from "./pages/ArticuloDetalle";
import Autor from "./pages/Autor";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="articulos" element={<Articulos />} />
                <Route path="articulos/:id" element={<ArticuloDetalle />}>
                    <Route path="autor" element={<Autor />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
