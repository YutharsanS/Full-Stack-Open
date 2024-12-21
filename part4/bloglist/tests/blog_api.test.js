const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const test_helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = test_helper.blogMultiple.map(blog => Blog(blog)) // should switch based on the test
    const promises = blogs.map(blog => blog.save())
    await Promise.all(promises)
})

describe('get requests', () => {
    test('getting from /api/blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('post requests', () => {
    test('posting to /api/blogs', async () => {

        await api
            .post('/api/blogs')
            .send(test_helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const currentBlogs = await test_helper.notesInDB()
        const initialBlogs = test_helper.blogMultiple

        assert.strictEqual(currentBlogs.length, initialBlogs.length + 1)
        const contents = currentBlogs.map(blog => blog.title)
        assert(contents.includes('Untitled'))
    })

    test('post without likes', async () => {
        await api
            .post('/api/blogs')
            .send(test_helper.blogWtLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await test_helper.notesInDB()
        const blog = blogs[blogs.length - 1]
        assert.strictEqual(blog.likes, test_helper.blogWtLikes.likes || 0)
    })

    test('posts without author and title', async () => {
        await api
            .post('/api/blogs')
            .send(test_helper.blogWtTA)
            .expect(400)
    })

    test('posts with only url', async () => {
        await api
            .post('/api/blogs')
            .send(test_helper.blogWOUrl)
            .expect(400)
    })
})

after(() => {
    mongoose.connection.close()
})