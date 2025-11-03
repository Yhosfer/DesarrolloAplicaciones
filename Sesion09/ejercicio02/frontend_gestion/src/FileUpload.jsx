import React, { useState, useEffect } from "react";

export default function FileUpload() {
    const [especialidad, setEspecialidad] = useState("Estadistica");
    const [archivo, setArchivo] = useState(null);
    const [archivos, setArchivos] = useState([]);

    const especialidades = ["Estadistica", "DesarrolloWeb", "Testing"];

    const subirArchivo = async (e) => {
        e.preventDefault();
        if (!archivo) return alert("Selecciona un archivo");

        const formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("especialidad", especialidad);

        const resp = await fetch("http://localhost:4001/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!resp.ok) {
            const err = await resp.text();
            throw new Error(err || 'Error de conexión');
        }

        const data = await resp.json();
        alert(data.message);
        obtenerArchivos();


    };

    const obtenerArchivos = async () => {
        const resp = await fetch(`http://localhost:4001/api/archivos/${especialidad}`);
        const data = await resp.json();
        setArchivos(data);
    };

    useEffect(() => {
        obtenerArchivos();
    }, [especialidad]);

    return (
        <div style={{ maxWidth: 600, margin: "20px auto", padding: 20 }}>
            <h2>Gestor de Archivos por Especialidad</h2>

            <form onSubmit={subirArchivo}>
                <label>Especialidad:</label>
                <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
                    {especialidades.map((esp) => (
                        <option key={esp}>{esp}</option>
                    ))}
                </select>

                <br /><br />
                <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
                <br /><br />
                <button type="submit">Subir archivo</button>
            </form>

            <h3>Archivos en {especialidad}</h3>
            <ul>
                {archivos.map((a) => (
                    <li key={a.id}>
                        {a.nombre_archivo} —{" "}
                        <a
                            href={`http://localhost:4001/api/ver/${a.especialidad}/${encodeURIComponent(a.ruta)}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ver archivo
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
