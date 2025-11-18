const express = require('express');
const app = express();

app.use(express.json());        // <--- IMPORTANTE
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const bookRouter = require('./routes/books');
app.use('/api', bookRouter);

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
