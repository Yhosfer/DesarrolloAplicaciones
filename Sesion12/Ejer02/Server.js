const express = require('express');
const app = express();

const db = require('./app/db');
const router = require('./app/controllers/routes');

app.use('/api', router);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
