var mysql = require('mysql')
var BASE_DATOS_DEFECTO = 'test';
var HOST_DEFECTO = 'localhost';
var USUARIO_DEFECTO = 'root';
var PASSWORD_DEFECTO = 'test';
var conexion = null;
var datosConexion = null;
//Inicializar la conexion con una base de datos
var crearConexion = function(datos) {
    if (conexion) {
        cerrarConexion();
    }
    datosConexion = {
        host: datos && datos.host ? datos.host : HOST_DEFECTO,
        user: datos && datos.user ? datos.user : USUARIO_DEFECTO,
        password: datos && datos.password ? datos.password : PASSWORD_DEFECTO,
        database: datos && datos.database ? datos.database : BASE_DATOS_DEFECTO
    };
    conexion = mysql.createConnection(datosConexion);
};

//Volver a conectar o reiniciar la conexion
var abrirConexion = function(callbackOk, callbackError) {
    if (conexion) {
        conexion.connect(function(error) {
            if (error) {
                console.log("Ha ocurrido un error al conectar con la base de datos");
                callbackError(error);
            } else {
                callbackOk();
            }
        })
    } else {
        console.log("No existe una conexión con la base de datos");
    }
};
//Terminar la conexion
var cerrarConexion = function() {
    console.log("cerrando Conexion");
    if (conexion) {
        conexion.end();
    }
    datosConexion = null;
    conexion = null;
};

//Volver a conectar o reiniciar la conexion
var reiniciarConexion = function() {
    console.log("Reiniciando Conexion");

    if (datosConexion) {
        crearConexion(datosConexion);
    } else {
        console.log("No existe una conexión previa con la base de datos");
    }
};

module.exports = {
    creaConexion: crearConexion,
    conecta: abrirConexion,
    desconecta: cerrarConexion,
    reinicia: reiniciarConexion
};
