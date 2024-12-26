module.exports = {
    Error_de_servidor: {
        filtro_invalido: {
            id: 'errordefiltro',
            statusCode: 400,
            message: 'filtro invalido',
            description: 'los datos a filtrar son invalidos, por favor intentar otro filtro',
        },
        No_existe_joyas: {
            id: 'not found',
            statusCode: 404,
            message: 'not found',
            description: 'No existe esta joya',
        },
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor',
        description: 'error inesperado en el servidor',
    }

}