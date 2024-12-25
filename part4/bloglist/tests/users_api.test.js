const { test, describe, beforeEach, after } = require('node:test')
const assert = require('assert')
const test_helper = require('../utils/test_helper')

const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

describe('users database with 1 existing user', () => {

    beforeEach(async () => {
        const docs = test_helper.initialUsers
        await User.deleteMany({})
        await User.insertMany(docs)
    })

    test('adding an user with an invalid username', async () => {
        const newUser = {
            username: 'Bo',
            name: 'Bow Bow',
            password: '12345'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Invalid input'))
    })

    test('adding an user with an invalid password', async () => {
        const newUser = {
            username: 'Bowww',
            name: 'Bow Bow',
            password: '12'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('password needs to be at least 3 character long'))
    })

    test('adding an user with the same username', async () => {
        const newUser = {
            username: 'yutharsanS',
            name: 'Weeb',
            password: 'otaku'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('expected `username` to be unique'))
    })
})

after(async () => {
    mongoose.connection.close()
})
