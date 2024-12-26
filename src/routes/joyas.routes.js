//este archivo es para definir los endpoints 

const { Router } = require ('express');   //exportando el router de express para ser usado. 
const router = Router();
const {handleGetJoyas, handleGetJoyasFiltradas} = require ('../controllers/joyas.controllers')  //importamos los controladores que continene la logica para manejar las solicitudes a los endpoints correspondientes. 


router.get('/', handleGetJoyas);  //obtener joyas 
router.get('/filtros', handleGetJoyasFiltradas ) //filtros 


module.exports = router;