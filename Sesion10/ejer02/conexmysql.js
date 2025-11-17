// Solicitando paquete de Mysql
var mysql = require('mysql');

// Configurando parámetros de conexión
var conexion = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    database: 'ejerci02db', // Ahora debe existir en el servidor 3307
    user: 'root',
    password: '',
});
// Realizando conexión o verificando si sucedió un error
conexion.connect(function(err){
    if(err){
        console.error("Error de conexion: "+ err.stack);
        // Si hay error en la conexión, salimos de la función
        return;
    }
    console.log(" Conectado exitosamente al ID: "+conexion.threadId);

    // Realizando la consulta (Solo se ejecuta si la conexión fue exitosa)
    conexion.query('SELECT * FROM clientes', function(error, results){

        if(error) {
            console.error("\n Error al ejecutar la consulta: " + error.message);
            // Si el error ocurre aquí (ej: tabla no existe), lanzamos el error
            conexion.end(); // Cerrar la conexión antes de lanzar el error
            throw error;
        }

        console.log("\n Datos de la tabla 'clientes':");
        results.forEach(element => {
            // Mostramos cada registro obtenido
            console.log(`ID: ${element.id}, Nombre: ${element.nombre}, Email: ${element.email}`);
        });

        // Cerrando la conexión (Se ejecuta solo si la consulta fue exitosa)
        conexion.end(function(err) {
            if (err) {
                console.error("\n️ Error al cerrar la conexión: " + err.message);
                return;
            }
            console.log("\n Conexión cerrada.");
        });
    });
});