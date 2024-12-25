const bcrypt = require('bcrypt')

const User = require('../models/user')

const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!(password.length > 2)) {
        response.status(400).json({ error: 'password needs to be at least 3 character long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username: username,
        name: name,
        passwordHash: passwordHash
    })

    const returnedUser = await newUser.save()

    response.set(201).send(returnedUser.toJSON())
})


module.exports = usersRouter