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

module.exports = blogRouter