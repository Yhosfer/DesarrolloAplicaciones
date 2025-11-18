const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api',(req,res) =>{
    res.json({
        message: 'Esta es la Data de clientes'
    });
});

app.post('/api/posts', verifiToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if (err){
            res.sendStatus(403);
        } else {
            res.json({
                mensaje: 'Post Creado',
                authData
            });
        }
    })
})

app.post('/api/login',(req, res) =>{
    const user = {
        id: 1,
        username: 'yhosfer',
        email: 'yhosfer@gmail.com'
    }
    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token) =>{
        res.json({
            token
        })
    })
})
// Validar token
function verifiToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(5000,() => console.log('Servidor corriendo en el puerto 5000'))