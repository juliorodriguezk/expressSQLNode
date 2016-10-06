var bd = require('./bd'),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    bdUsuario = require('./modelos/usuario');
bd.creaConexion();

bd.conecta(function() {
    // console.log("Conectado !!");
    // bdUsuario.creaUsuario(911111111, {
    //     email: "mi@ema.il",
    //     password: 1234
    // });
    // bdUsuario.creaUsuario(911111111, {
    //     email: "mi@ema.il"
    // });
    // bdUsuario.creaUsuario(911111112, {
    //     email: "mi@ema.il"
    // });
    // bdUsuario.creaUsuario(911111113);
    // bdUsuario.consultaUsuario(911111111);
    // bdUsuario.consultaUsuario(911111111, {
    //     email: true
    // });
    // bdUsuario.consultaUsuario(911111111, {
    //     email: true,
    //     telefono: true
    // });
    // bdUsuario.consultaUsuario(911111111, {
    //     email: true,
    //     password: true
    // });
    // bdUsuario.consultaUsuario(911111111, {
    //     telefono: true,
    //     email: true,
    // });
    // bdUsuario.consultaUsuario(911111111, {
    //     telefono: true,
    //     password: true
    // });
    // bdUsuario.consultaUsuario(911111111, {
    //     password: true,
    //     telefono: true
    // });
    // bdUsuario.consultaUsuario(911111111, {
    //     password: true,
    //     email: true
    // });
    // bdUsuario.consultaUsuario(911111111, {
    //     password: true,
    //     email: true,
    //     telefono: true
    // });
    // bdUsuario.consultaUsuario(911111111, {});
    // bdUsuario.consultaUsuario(911111111, null);
    // bdUsuario.consultaUsuario(911111111, 7);
    //bdUsuario.eliminaUsuario(911111111);


}, function(e) {
    console.log("No Conectado !!");
    console.log(e);
});
