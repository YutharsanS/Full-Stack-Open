const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    const message = error.message

    if (error.name === 'ValidationError') {
        response.status(400).send({ error: 'Invalid input' })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
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

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization') // getting the header

    if (authorization && authorization.startsWith('Bearer ')) { // removing the scheme info from the request
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }

    next()
}

const userExtractor = async (request, response, next) => {
    // get the token from the request and verify it
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    request.user = await User.findById(decodedToken.id)

    next()
}

module.exports = {
    errorHandler,
    requestLogger,
    tokenExtractor,
    userExtractor
}