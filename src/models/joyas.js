const { DB } = require("../config/bd");
const format = require("pg-format");

// Función para preparar la estructura HATEOAS
const prepararHATEOAS = (joyas) => {
    const results = joyas.map((j) => {
        return {
            id: j.id,
            nombre: j.nombre,
            precio: j.precio,
            categoria: j.categoria,
            metal: j.metal,
            href: `/joyas/${j.id}` // Enlace a la joya específica
        };
    });

    const total = joyas.length;
    const HATEOAS = {
        total,
        results,
        _links: {
            self: { href: '/joyas' },  // Enlace a la lista de joyas
            next: { href: '/joyas?page=2' },  // Ejemplo de enlace a la siguiente página
            prev: { href: '/joyas?page=1' },  // Ejemplo de enlace a la página anterior
        }
    };

    return HATEOAS;
};

// Obtener todas las joyas con paginación y orden
const getJoyas = async (limit = 10, order_by = 'id_ASC', page = 1) => {
    try {
        const [campo, direccion] = order_by.split("_");
        const offset = Math.ceil(page - 1) * limit;  // Calcular el desplazamiento
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
        
        const { rows, rowCount } = await DB.query(SQLQuery);
        const { rowCount: count } = await DB.query('SELECT * FROM inventario');
        
        // Preparar HATEOAS
        const joyasConHATEOAS = prepararHATEOAS(rows);

        return {
            ...joyasConHATEOAS,
            rowCount,
            pages: Math.ceil(count / limit)
        };
    } catch (error) {
        throw error;
    }
};

// Obtener joyas filtradas con HATEOAS
const getJoyasFiltradas = async (precio_min, precio_max, categoria, metal) => {
    try {
        const consulta = manejarJoyasFiltradas(precio_min, precio_max, categoria, metal);

        const { rows, rowCount } = await DB.query(consulta.query, consulta.values);
        
        // Preparar HATEOAS
        const joyasConHATEOAS = prepararHATEOAS(rows);

        return {
            ...joyasConHATEOAS,
            rowCount
        };
    } catch (error) {
        throw error;
    }
};

// Función para manejar los filtros en las joyas
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

module.exports = { getJoyas, getJoyasFiltradas };
