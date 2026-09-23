const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

// Middleware, joka käsittelee osoitteet, joille ei ole määritelty routea
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Middleware, joka käsittelee virhetilanteet
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'SequelizeDatabaseError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'SequelizeValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'SequelizeUniqueConstraintError') {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token missing or invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('Authorization')
    console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.replace('Bearer ', '')
        console.log(request.token)
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    request.user = await User.findByPk(decodedToken.id)
    next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }