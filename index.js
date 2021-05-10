// const express = require('express');
// 5. Habilitando la Sintaxis de Imports y Exports
// en package.json se agrega "type": "module",
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv'
dotenv.config({path: 'variables.env'})
const app = express();

// Conectar la base de datos
db.authenticate()
  .then( () => console.log('Base de datos Conectada') )
  .catch( error => console.log(error));

// Definir puerto
// const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// 12. Middleware en Express. Obtener el año actual
app.use( (req, res, next) => {
    //res.locals.unaVariable = 'Una nueva variable';
    //console.log(res.locals);// forma para compartir valores de este archivo a una vista
    const year = new Date();
    res.locals.actualYear = year.getFullYear(); 
    res.locals.nombreSitio = 'Agencia de Viajes';
   next();// sirve para ir al sgte. middleware
//para obligar return next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

/**Puerto y host para la app */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

// Si tuvieramos 100páginas se esta cargando el index
// Se puede separar, es una ventaja de MVC
// 6. Routing en Express
app.listen(port, host, () =>{
  console.log('El servidor esta funcionando');
});
