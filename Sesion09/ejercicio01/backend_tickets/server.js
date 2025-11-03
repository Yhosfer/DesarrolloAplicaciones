const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // 👈 cambia según tu usuario
    password: '',        // 👈 cambia si tu MySQL tiene contraseña
    database: 'airline_app',
    waitForConnections: true,
    connectionLimit: 10
});

// Utilidad: calcular edad (en años)
function calculateAge(birthDateStr) {
    const today = new Date();
    const b = new Date(birthDateStr);
    let age = today.getFullYear() - b.getFullYear();
    const m = today.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
    return age;
}

// Endpoint: calcular precio de pasaje según edad
app.post('/api/calculate-price', async (req, res) => {
    try {
        const { dateOfBirth, basePrice } = req.body;
        if (!dateOfBirth || basePrice == null) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const age = calculateAge(dateOfBirth);
        let finalPrice;

        if (age < 2) finalPrice = 0;
        else if (age >= 2 && age <= 17) finalPrice = Number((basePrice * 0.75).toFixed(2));
        else finalPrice = Number(basePrice.toFixed(2));

        res.json({ age, finalPrice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Función: verificar si una matriz es “perfecta” (cuadrado mágico)
function isMagicSquare(mat) {
    const n = mat.length;
    if (!n) return false;
    const target = mat[0].reduce((a, b) => a + b, 0);

    // filas
    for (let i = 0; i < n; i++) {
        const s = mat[i].reduce((a, b) => a + b, 0);
        if (s !== target) return false;
    }

    // columnas
    for (let j = 0; j < n; j++) {
        let s = 0;
        for (let i = 0; i < n; i++) s += mat[i][j];
        if (s !== target) return false;
    }

    // diagonales
    let sd1 = 0, sd2 = 0;
    for (let i = 0; i < n; i++) {
        sd1 += mat[i][i];
        sd2 += mat[i][n - 1 - i];
    }

    return sd1 === target && sd2 === target;
}

// 🔹 Endpoint: generar matriz aleatoria y verificar si es “perfecta”
app.post('/api/matrix/random', (req, res) => {
    const { n, min = 1, max = 9 } = req.body;
    if (!n || n <= 0) return res.status(400).json({ error: 'n inválido' });

    // generar matriz aleatoria
    const mat = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        mat.push(row);
    }

    const perfect = isMagicSquare(mat);
    res.json({ matrix: mat, isPerfect: perfect });
});

// Endpoint: registrar usuario
app.post('/api/register', async (req, res) => {
    try {
        const {
            full_name, address, email, password, date_birth, sex, interests, hobbies
        } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const password_hash = await bcrypt.hash(password, 10);
        const conn = await pool.getConnection();

        try {
            const [result] = await conn.query(
                `INSERT INTO users 
        (full_name, address, email, password_hash, date_birth, sex, interests, hobbies)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    full_name,
                    address,
                    email,
                    password_hash,
                    date_birth,
                    sex,
                    JSON.stringify(interests || []),
                    hobbies || null
                ]
            );

            conn.release();
            res.json({ success: true, userId: result.insertId });
        } catch (err) {
            conn.release();
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Email ya registrado' });
            }
            throw err;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ API en puerto ${PORT}`));
