const errors = require ('../helpers/errorMessages');


const errorMiddleware = (err, req, res, next) => {

    const errorDetails = errors[err.message] || errors['Error_de_servidor'];

    const response = {

        id: errorDetails.id,
        message: errorDetails.message,
        description: errorDetails.description

    }

    res.status(errorDetails.statusCode).json(response);

}

module.exports = errorMiddleware