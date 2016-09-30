var bd = require('./bd');
bd.creaConexion();

bd.conecta(function() {
    console.log("Conectado !!");
}, function(e) {
    console.log("No Conectado !!");
    console.log(e);
});
