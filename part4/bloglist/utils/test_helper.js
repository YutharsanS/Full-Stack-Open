const Blog = require('../models/blog')

const blogSingle = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]

const blogMultiple = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const initialUsers = [{
    username: 'yutharsanS',
    name: 'Yutharsan',
    password: '12345'
}]

const blogNoDocs = []

const newBlog = {
    title: 'Untitled',
    author: 'Anonymous',
    url: 'www.unexistent.com',
    likes: 1
}

const blogWtLikes = {
    title: 'Untitled1',
    author: 'Anonymous1',
    url: 'www.unexistent1.com',
}

const blogWtTA = {
    url: 'www.unexistent2.com',
    likes: 2
}

const blogWOUrl = {
    url: 'www.unexistent3.com'
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const validId = async () => {
    const blogs = await blogsInDB()
    return blogs[0].id
}

module.exports = {
    blogSingle,
    blogMultiple,
    blogNoDocs,
    blogsInDB,
    newBlog,
    blogWtLikes,
    blogWtTA,
    blogWOUrl,
    validId,
    initialUsers
}