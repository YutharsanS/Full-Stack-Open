const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    const message = error.message

    if (error.name === 'ValidationError') {
        response.status(400).send({ error: 'Invalid input' })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else {
        logger.info(message)
    }

    next(error)
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

module.exports = {
    errorHandler,
    requestLogger
}