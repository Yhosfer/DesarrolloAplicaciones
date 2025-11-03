const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Configura conexión MySQL
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gestion_archivos",
});

// Carpeta base
const BASE_DIR = path.join(__dirname, "uploads");
["Estadistica", "DesarrolloWeb", "Testing"].forEach((dir) => {
    const fullPath = path.join(BASE_DIR, dir);
    if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

// --- SUBIDA DE ARCHIVO ---
app.post("/api/upload", (req, res) => {
    // 1️ Primero cargamos en memoria para leer especialidad
    const tempUpload = multer({ storage: multer.memoryStorage() }).single("archivo");

    tempUpload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: "Error al recibir archivo temporal" });

        const especialidad = req.body.especialidad;
        if (!especialidad) return res.status(400).json({ error: "Falta especialidad" });

        // 2️ Creamos la carpeta correcta si no existe
        const dir = path.join(BASE_DIR, especialidad);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        // 3️ Creamos un nombre único para el archivo
        const fileName = Date.now() + "-" + req.file.originalname;
        const fullPath = path.join(dir, fileName);

        // 4️ Guardamos el archivo desde el buffer en disco
        fs.writeFileSync(fullPath, req.file.buffer);

        // Guardamos la info en MySQL
        try {
            const conn = await pool.getConnection();
            await conn.query(
                "INSERT INTO archivos (nombre_archivo, ruta, especialidad) VALUES (?, ?, ?)",
                [req.file.originalname, fileName, especialidad]
            );
            conn.release();
            res.json({ message: "Archivo subido con éxito", archivo: fileName });
        } catch (dbErr) {
            console.error("x! Error BD:", dbErr);
            res.status(500).json({ error: "Error al guardar en la base de datos" });
        }
    });
});

// --- LISTAR ARCHIVOS ---
app.get("/api/archivos/:especialidad", async (req, res) => {
    const { especialidad } = req.params;
    const [rows] = await pool.query(
        "SELECT * FROM archivos WHERE especialidad = ?",
        [especialidad]
    );
    res.json(rows);
});

// --- VER ARCHIVO ---
app.get("/api/ver/:especialidad/:nombre", (req, res) => {
    const { especialidad, nombre } = req.params;
    const decodedName = decodeURIComponent(nombre);
    const ruta = path.join(BASE_DIR, especialidad, decodedName);

    console.log("🧾 Buscando archivo en:", ruta);

    if (!fs.existsSync(ruta)) {
        return res.status(404).send("Archivo no encontrado");
    }

    res.sendFile(ruta);
});

// --- INICIAR SERVIDOR ---
const PORT = 4001;
app.listen(PORT, () => console.log(`... Servidor corriendo en puerto ${PORT}`));
