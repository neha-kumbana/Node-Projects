const {StatusCodes} = require('http-status-codes')
const {CustomAPIError, UnauthenticatedError} = require('../error')

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof UnauthenticatedError){
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}

module.exports = errorHandlerMiddleware