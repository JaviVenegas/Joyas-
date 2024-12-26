const joyas = require ('../models/joyas')

const handleGetJoyas = async (req, res, next) => {
    try{
        const {limit, order_by, page} = req.query
        const response = await joyas.getJoyas(limit, order_by, page);
        res.status(200).json({
            msg: 'Joyas obtenidas con exito',
            data: response
        });
    }catch(error){
        next (error)
    }
};


const handleGetJoyasFiltradas = async (req, res, next) => {
    try{
        const {precio_min, precio_max, categoria, metal} = req.query
        const response = await joyas.getJoyasFiltradas(precio_min, precio_max, categoria, metal);
        res.status(200).json({
            msg: 'Joyas filtradas',
            data: response
        });
    }catch(error){
        next (error)
    }
};



module.exports = {handleGetJoyas, handleGetJoyasFiltradas}