
//este archivo es para definir los endpoints 

const express = require ('express');   //exportando el router de express para ser usado. 

const joyasRoutes = require ('./joyas.routes');

const app = express();



app.use ('/joyas', joyasRoutes);


module.exports = app; 
