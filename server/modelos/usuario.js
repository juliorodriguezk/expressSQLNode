var bd = require('../bd');

/**
 *  La estructura de un usuario es la siguiente
 *  telefono: Number  - Clave primaria - no nulo
 *  email:    String
 *  password: String
 */
var compruebaTelefono = function(telefono) {
    return typeof telefono === 'number' ? telefono : telefono.parseInt ? telefono.parseInt() : null;
};
/**
 * Función para crear un usuario en la base de datos
 * @param  {Number || String}  telefono obligatorio
 * @param  {Object}   datos    JSON puede incluir email y password
 * @param  {Function} callback Callback a ejecutar
 */
var crear = function(telefono, datos, callback) {
    var conexion = bd.conexion(),
        values = [null, null, null],
        telefono = compruebaTelefono(telefono),
        datos = datos || null,
        callback = typeof callback === 'function' ? callback : function(error, datos, info) {
            console.log(error)
            if (error) {
                console.log("Error::Usuarios::Crear::");
                console.log(error)
            }
            if (datos) {
                datos = datos.json(datos);
                console.log(datos);
            }
            if (info) {
                console.log(info);
            }
        };

    if (conexion !== null && telefono !== null) {
        values[0] = telefono;
        if (datos) {
            if (datos.email && datos.password) {
                values[1] = datos.email;
                values[2] = datos.password;
            }
        }
        conexion.query('INSERT INTO usuarios (idusuarios, email, password) VALUES(?, ?, ?)', values, function(error, resultado) {
            if (error) {
                return callback(error);
            } else {
                callback(null, resultado);
            }
        });
    } else {
        callback("Error::Usuarios::Crear::Usuario no especificado o BBDD no conectada.");
    }
};
/**
 * Función para consultar un usuario en la base de datos
 * @param  {Number || String}  telefono obligatorio
 * @param  {Object}   datos    JSON puede incluir email, password, telefono como booleanos
 * @param  {Function} callback Callback a ejecutar
 */
var consultar = function(telefono, datos, callback) {
    var cadenaDatos = '',
        query = '',
        values = [],
        conexion = bd.conexion(),
        telefono = compruebaTelefono(telefono),
        callback = typeof callback === 'function' ? callback : function(error, datos) {
            if (error) {
                console.log("Error::Usuarios::Consultar");
                console.log(error)
            }
            if (datos) {
                console.log("Usuarios::Consultar::Datos");
                console.log(datos);
            }
        };
    if (conexion !== null && telefono !== null) {
        if (datos) {
            if (datos.telefono) {
                cadenaDatos += 'idusuarios,';
            }
            if (datos.email) {
                cadenaDatos += 'email,';
            }
            if (datos.password) {
                cadenaDatos += 'password,';
            }
            cadenaDatos = cadenaDatos !== '' ? cadenaDatos.slice(0, -1) : '*';
        } else {
            cadenaDatos = '*';
        }
        values.push(telefono);
        query = 'SELECT ' + cadenaDatos + ' FROM usuarios WHERE idusuarios=?';

        conexion.query(query, values, function(error, resultado) {
            if (error) {
                return callback(error);
            } else {
                callback(null, resultado);
            }
        });
    } else {
        callback("Usuarios::Consultar::Usuario no especificado o BBDD no conectada.");
    }
};
/**
 * Función para crear un usuario en la base de datos
 * @param  {Number || String}  telefono obligatorio
 * @param  {Object}   datos    JSON puede incluir email y password con los valores a actualizar
 * @param  {Function} callback Callback a ejecutar
 */
var actualizar = function(telefono, datos, callback) {
    var cadenaDatos = '',
        query = '',
        values = [],
        conexion = bd.conexion(),
        telefono = compruebaTelefono(telefono),
        callback = typeof callback === 'function' ? callback : function(error, datos) {
            if (error) {
                console.log("Error::Usuarios::Actualizar");
                console.log(error)
            }
            if (datos) {
                console.log("Usuarios::Actualizar::Datos");
                console.log(datos);
            }
        };
    if (conexion !== null && telefono !== null) {
        if (datos) {
            if (datos.email) {
                cadenaDatos += 'email=?,';
                values.push(datos.email);
            }
            if (datos.password) {
                cadenaDatos += 'password=?,';
                values.push(datos.password);
            }
            cadenaDatos = cadenaDatos !== '' ? cadenaDatos.slice(0, -1) : '';
        } else {
            cadenaDatos = '*';
        }
        values.push(telefono);
        if (cadenaDatos !== '') {
            query = 'UPDATE usuarios SET ' + cadenaDatos + ' WHERE idusuarios=?';

            conexion.query(query, values, function(error, resultado) {
                if (error) {
                    return callback(error);
                } else {
                    callback(null, resultado);
                }
            });
        } else {
            //Caso en el que no hay nada que actualizar
            callback(null, {
                affectedRows: 0,
                message: '(Rows matched: 0  Changed: 0  Warnings: 0)'
            });
        }
    } else {
        callback("Usuarios::Actualizar::Usuario no especificado o BBDD no conectada.");
    }
};
/**
 * Función para eliminar un usuario de la base de datos
 * @param  {Number || String}  telefono obligatorio
 * @param  {Function} callback Callback a ejecutar
 */
var eliminar = function(telefono, callback) {
    var query = '',
        values = [],
        conexion = bd.conexion(),
        telefono = compruebaTelefono(telefono),
        callback = typeof callback === 'function' ? callback : function(error, datos) {
            if (error) {
                console.log("Error::Usuarios::Eliminar");
                console.log(error)
            }
            if (datos) {
                console.log("Usuarios::Eliminar::Datos");
                console.log(datos);
            }
        };
    if (conexion !== null && telefono !== null) {
        values.push(telefono);
        query = 'DELETE FROM usuarios WHERE idusuarios=?';
        conexion.query(query, values, function(error, resultado) {
            if (error) {
                return callback(error);
            } else {
                callback(null, resultado);
            }
        });
    } else {
        callback("Usuarios::Eliminar::Usuario no especificado o BBDD no conectada.");
    }

};

module.exports = {
    creaUsuario: crear,
    eliminaUsuario: eliminar,
    actualizaUsuario: actualizar,
    consultaUsuario: consultar
};
