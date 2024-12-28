const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash) // compare password hash

    if (!(user && passwordCorrect)) {
        response.status(401).json({
            error: 'invalid username or password'
        })
    }

    // define user content
    const userForToken = {
        id: user._id,
        username: user.username
    }

    // token
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })

    // send the response
    response.status(200).json({ token, username: user.username, name: user.name })

})

module.exports = loginRouter