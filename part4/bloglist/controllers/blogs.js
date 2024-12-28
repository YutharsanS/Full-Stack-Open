const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .populate('user', {
            username: 1,
            name: 1,
        })
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    // get the token from the request and verify it
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)

    await user.save()

    // Specifying default likes
    if (!blog.likes) {
        blog.likes = 0
    }

    // Checking for title and url
    if (blog.title && blog.url) {
        blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
            .catch(error => next(error))
    } else {
        response.status(400).end()
    }
})

blogRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const res = await Blog.findById(id)

    if (res) {
        response.json(res)
    } else {
        response.status(404).end()
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    await Blog.findOneAndDelete(id)

    response.status(204).end(`blog ${id} is deleted from database`)
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body

    await Blog.findByIdAndUpdate(id, body)

    response.status(200).end(`blog ${id} is updated`)
})

module.exports = blogRouter