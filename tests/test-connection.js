// Importar el módulo 'mysql'
const mysql = require('mysql');
const config = require('../config');

// Configurar los parámetros de conexión a la base de datos
const connection = mysql.createConnection(config.db);

// Intentar conectar a la base de datos
connection.connect(function(err) {
  if (err) {
    console.error('Error de conexión:', err.stack);
    return;
  }
  
  console.log('Conexión exitosa a la base de datos.');
  
  // Cerrar la conexión después de la prueba
  connection.end(function(err) {
    if (err) {
      console.error('Error al cerrar la conexión:', err.stack);
      return;
    }
    console.log('Conexión cerrada correctamente.');
  });
});
