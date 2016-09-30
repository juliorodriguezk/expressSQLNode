# expressSQLNode
Conexión  base de datos y servicios con express para Node

## Crear nuevo paquete Node
```
npm init -y
```

## Instalar módulos necesarios
```
npm install --save express
npm install --save mysql
```
## Cómo conectar con nuestra base de datos

```
var mysql = require('mysql')
//Crear la conexión
var conexion = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'password',
  database: 'BBDD a conectar'
});
//Conectar
conexion.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos')
});
//Terminar la conexion
conexion.end();

```

## Consultar base de datos
```
//coxexion debe de existir
//INSERTAR DATOS
conexion.query('INSERT INTO ...',function(error, data){
  if (error){
    throw error;
  }
  console.log(data);
}
//INSERTAR DATOS
conexion.query('SELECT * FROM ...',function(error, data, , campos){
  if (error){
    throw error;
  }
  //estructura devuelta
  //data
  //data[resultado]
  //data[resultado][nombre_campo]
}
```
## Creación modelos y controladores con express
### Separar los distintos archivos
- app.js
- bd.js
- controladores
  - controlador1.js
  - ...
  - controladorN.js
- modelos
  - modelo1.js
  - ...
  - modeloN.js

#### bd.js
- En este fichero se define la conexión y funciones relativas a la BBDD ver (Cómo conectar con nuestra base de datos)

#### app.js
```
var express = require('express');
var bd = require('./bd');
//Creo la nueva app
var app = express();

//Intento conectar a la bbdd si ok arranco servicios en el puerto que quiera
  bd.connect(function (err){
      if (err){
        console.log("No ha sido posible conectar con la base de datos");
        process.exit(1);
      }else{
        app.listen(puerto, function(){
          console.log('Servicios levantados escuchando en el puerto'+ puerto);
          });
      }
    });
```
#### controladores
- Definicion de los servicios y las rutas asociadas
```
app.get('ruta', accionModelo);
app.post('ruta', accionModelo);
app.delete('ruta', accionModelo)
```

#### Modelos
- Acciones (crear, borrar, modificar)

```
modelo.crearNuevo = function(datos, callback){
  if (conexion){
    ejecutaquery("nombreQuery", function(error, resultado){});
  }
};
modelo.borrar = function(datos, callback){
  if (conexion){
    ejecutaquery("nombreQuery", function(error, resultado){});
  }
};
modelo.modificar = function(datos, callback){
  if (conexion){
    ejecutaquery("nombreQuery", function(error, resultado){});
  }
};
```
