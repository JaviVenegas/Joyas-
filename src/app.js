//librerias 
const express = require ("express");
const cors = require ("cors");
const morgan = require('morgan');
const errorMiddleware = require ('./middlewares/errorMiddleware');

//Importacion de rutas 
const APIRoutes = require ('./routes/routes');


const app = express();


//configuracion de morgan para detectar errores en consola. 
app.use(morgan('dev'));


//Middelwares 
app.use(cors());
app.use (express.json());

//ruta de las APIs
app.use('/', APIRoutes);


//maneja el error en middleware - siempre se ubica al final de todas las rutas de la app. 
app.use(errorMiddleware)

//exportar archivo
module.exports = app 