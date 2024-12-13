const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    const message = error.message

    logger.info(message)

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