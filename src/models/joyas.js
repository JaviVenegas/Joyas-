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


const getJoyasFiltradas = async (precio_min, precio_max, categoria, metal) => { 
    try {
        
        const consulta = manejarJoyasFiltradas(precio_min, precio_max, categoria, metal);
        
       
        const { rows, rowCount } = await DB.query(consulta.query, consulta.values);
        return {
            rows, 
            rowCount
        };
    } catch (error) {
        throw error;
    }
};



const manejarJoyasFiltradas = (precio_min = '', precio_max = '', categoria = '', metal = '') => {
    let filtros = [];
    let values = [];
    let query = "SELECT * FROM inventario";

    // Agregar filtros a la consulta
    if (precio_max) {
        filtros.push("precio <= $1");
        values.push(precio_max);
    }
    if (precio_min) {
        filtros.push("precio >= $2");
        values.push(precio_min);
    }
    if (categoria) {
        filtros.push("categoria ILIKE $3");
        values.push(`%${categoria}%`);
    }
    if (metal) {
        filtros.push("metal ILIKE $4");
        values.push(`%${metal}%`);
    }

    if (filtros.length) {
        query += " WHERE " + filtros.join(" AND ");
    }

    return { query, values };
};



module.exports = {getJoyas, getJoyasFiltradas}