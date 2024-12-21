const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

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