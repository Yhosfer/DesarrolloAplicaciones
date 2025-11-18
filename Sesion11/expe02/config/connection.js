const mysql = require('mysql');

// conexión a la base de datos
var con = mysql.createConnection({
    host: 'localhost',
    database: 'biblioteca',
    user: 'root',
    password: '',
    port: 3307
});

con.connect(err => {
    if (err) throw err;
    console.log("Conectado a la base de datos / La niña está triste");
});

module.exports = con;
