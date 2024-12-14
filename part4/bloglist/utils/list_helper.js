const lodash = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogList) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogList.reduce(reducer, 0)
}

const topPost = (blogList) => {
    const sortFunction = (a, b) => {
        if (a.likes < b.likes) {
            return -1
        } else if (a.likes === b.likes) {
            return 0
        } else {
            return 1
        }
    }

    const sortedList = [...blogList].sort(sortFunction)

    if (sortedList.length === 0) {
        return null
    }

    const topPost = sortedList[sortedList.length - 1]

    return {
        title: topPost.title,
        author: topPost.author,
        likes: topPost.likes
    }
}

const topAuthor = (blogList) => {

    if (blogList.length === 0) {
        return null
    }

    const postCounts = lodash.countBy(blogList, 'author')

    const postCountsArray = lodash.map(postCounts, (count, author) => ({ author:author, blogs:count }))

    const topAuthor = lodash.maxBy(postCountsArray, 'blogs')

    return topAuthor
}

const mostLikes = (blogList) => {
    if (blogList.length === 0) {
        return null
    }

    const groupedList = lodash.groupBy(blogList, 'author')

    const groupedListArray = lodash.map(groupedList, (value, key) => {
        const total = lodash.sumBy(value, (item) => item.likes)

        return {
            author: key,
            likes: total
        }
    })

    const popularAuthor = lodash.maxBy(groupedListArray, 'likes')
    return popularAuthor
}

module.exports = {
    dummy,
    totalLikes,
    topPost,
    topAuthor,
    mostLikes
}