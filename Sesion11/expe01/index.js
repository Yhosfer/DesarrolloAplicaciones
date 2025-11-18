//  objetos que dependen de los paquetes instalados:
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

//   conexión a la base de Datos:
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'barbershop',
    user: 'root',
    password: '',
    port: 3307
})

//   función que verifica la conexión a la base de Datos:
connection.connect(function (err) {
    if (err) throw err;
    console.log("Conectado a la base de datos");
});

//  código que convierte los registros de las
//  tablas de la tabla a formato json.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Crear el servidor Node.js dentro de la aplicación
var server = app.listen(3000, "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port
})
//  api que extrae Los registros de la tabla
app.get('/books', function (req, res) {
    connection.query('SELECT * FROM books where id= 3', function (error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});
