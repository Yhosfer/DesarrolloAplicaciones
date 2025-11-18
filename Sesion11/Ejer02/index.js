const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Clave secreta para firmar el token
const SECRET = 'super_secreto_lab11';

// Usuario de ejemplo (deberia venir de BD pero esto es lo que hay pipipi)
const USER_DEMO = {
    username: 'admin',
    password: '1234',
    nombre: 'Administrador del Sistema'
};

// ENDPOINT PÚBLICO
app.get('/', (req, res) => {
    res.json({ message: 'API JWT funcionando correctamente' });
});

// LOGIN (GENERA TOKEN)
// POST recibe credenciales y devuelve un JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validación simple: usuario fijo
    if (username !== USER_DEMO.username || password !== USER_DEMO.password) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Datos del token
    const payload = {
        username: USER_DEMO.username,
        nombre: USER_DEMO.nombre
    };

    // Generar token con expiración
    const token = jwt.sign(payload, SECRET, { expiresIn: '2m' });

    res.json({
        message: 'Login exitoso',
        token
    });
});

//VERIFICAR TOKEN
function verifyToken(req, res, next) {
    // Esperamos autorización en el header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Token requerido (Authorization header)' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Formato de token inválido. Use: Bearer <token>' });
    }

    const token = parts[1];

    // Verificar token y su expiración
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            // err.name puede ser 'TokenExpiredError' o 'JsonWebTokenError'
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado' });
            }
            return res.status(401).json({ error: 'Token inválido' });
        }

        // Guardamos los datos del usuario en la request
        req.user = decoded;
        next();
    });
}

// 1) GET  solo con token válido
app.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Acceso permitido al perfil',
        user: req.user
    });
});

// BD en memoria
let notes = [
    { id: 1, text: 'Nota secreta 1' },
    { id: 2, text: 'Nota secreta 2' }
];

// 2) GET protegida
app.get('/notes', verifyToken, (req, res) => {
    res.json({
        message: 'Notas protegidas solo para usuarios con JWT válido',
        data: notes
    });
});


// LEVANTAR SERVIDOR
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🔐 Ejercicio 2 corriendo en http://localhost:${PORT}`);
});