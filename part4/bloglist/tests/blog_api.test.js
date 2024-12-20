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
        const newBlog = {
            title: 'Untitled',
            author: 'Anonymous',
            url: 'www.unexistent.com',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const currentBlogs= await test_helper.notesInDB()
        const initialBlogs = test_helper.blogMultiple

        assert.strictEqual(currentBlogs.length, initialBlogs.length + 1)
        const contents = currentBlogs.map(blog => blog.title)
        assert(contents.includes('Untitled'))
    })
})


after(async () => {
    mongoose.connection.close()
})