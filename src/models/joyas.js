const {DB} = require ("../config/bd");
const format = require ( 'pg-format');


const getJoyas = async (limit = 10, order_by = 'id_ASC', page = 1) => {
    try{
        const [campo, direccion] = order_by.split("_")
        const offset = Math.ceil (page -1) * limit  //esto permite dejar la pagina en numero 1
        const SQLQuery = format(
            `SELECT * FROM inventario
            ORDER BY %s %s
            LIMIT %s
            OFFSET %s`,
            campo,
            direccion,
            limit,
            offset
        );
        const { rows, rowCount }= await DB.query (SQLQuery)
        const {rowCount: count} = await DB.query ('SELECT * FROM inventario')


        return {
            rows,
            rowCount,
            pages: Math.ceil(count / limit)
    } 
    } catch (error){
        throw error
    }
}



const getJoyasFiltradas = async ({ stock_min, precio_max }) => { 
    try{
        const  SQLQuery = manejarJoyasFiltradas (stock_min, precio_max)  //array para guardar la cantidad de filtros a entregar
        const { rows, rowCount } = await DB.query(consulta)
        return {
            rows, 
            rowCount, 
            pages: Math.ceil (count / limit)
        }
    }catch (error) {
        throw error
    }
}

const manejarJoyasFiltradas = ( stock_min ='', precio_max = '') => { //funcion para detectar que filtros entregar 
        let filtros = []
        if (precio_max) filtros.push(`precio <= ${precio_max}`)
        if (stock_min) filtros.push(`stock >= ${stock_min}`)

        let consulta = "SELECT * FROM inventario"

        if (filtros.length) {
            filtros = filtros.join(" AND ")
            consulta += ` WHERE ${filtros}`
        }
        return consulta
}
       
    




module.exports = {getJoyas, getJoyasFiltradas}