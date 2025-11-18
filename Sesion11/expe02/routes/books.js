const express = require('express');
const appRouter = express.Router();
const con = require('../config/connection');

// middleware
appRouter.use(express.json());
appRouter.use(express.urlencoded({ extended: true }));

// GET - listar libros
appRouter.get('/books', (req, res) => {
    con.query("CALL usp_listar_books();", (err, result) => {
        if (err) {
            console.error("Error ejecutando SP:", err);
            return res.status(500).json({ error: "Error en la consulta" });
        }
        res.json(result[0]); // extrae la primera tabla
    });
});

// POST - insertar libro
appRouter.post('/books', (req, res) => {

    const { title, autor, publicado } = req.body;

    if (!title || !autor || !publicado) {
        return res.status(400).json({
            error: "Debes enviar title, autor, publicado"
        });
    }

    const sql_insert = "CALL usp_insertar_books(?,?,?)";

    con.query(sql_insert, [title, autor, publicado], (err, result) => {
        if (err) {
            console.error("Error ejecutando SP:", err);
            return res.status(500).json({ error: "Error en la consulta" });
        }

        res.json({
            message: "Libro insertado correctamente",
            data: { title, autor, publicado }
        });
    });
});

module.exports = appRouter;
