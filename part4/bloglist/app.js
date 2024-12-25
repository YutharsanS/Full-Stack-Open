require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

mongoose.set('strictQuery', false)

logger.info('connecting to Mongodb')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info(`Connected to MongoDB using connection string : ${config.MONGODB_URI}`)
    })

const app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)

module.exports = app