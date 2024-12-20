const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')
const testHelper = require('../utils/test_helper')

test('for empty array returns 1 ', () => {
    const blog = []
    assert.strictEqual(listHelper.dummy(blog), 1)
})

describe('total likes', () => {

    test('only one blog in the list', () => {
        const result = listHelper.totalLikes(testHelper.blogSingle)
        assert.strictEqual(result, 5)
    })

    test('more than one blogs in the list', () => {
        const result = listHelper.totalLikes(testHelper.blogMultiple)
        assert.strictEqual(result, 36)
    })
})

describe('top post', () => {

    test('when there is no tie', () => {
        const result = listHelper.topPost(testHelper.blogMultiple)
        assert.deepStrictEqual(result, {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })

    test('when the list is empty', () => {
        const result = listHelper.topPost(testHelper.blogNoDocs)
        assert.deepStrictEqual(result, null)
    })
})

describe('top author', () => {

    test('with multiple blogs', () => {
        const result = listHelper.topAuthor(testHelper.blogMultiple)
        assert.deepStrictEqual(result, {
            author: 'Robert C. Martin',
            blogs: 3
        })
    })

    test('with no blogs', () => {
        const result = listHelper.topAuthor(testHelper.blogNoDocs)
        assert.deepStrictEqual(result, null)
    })
})

describe('most likes', () => {

    test('with multiple blogs', () => {
        const result = listHelper.mostLikes(testHelper.blogMultiple)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })

    test('with no blogs', () => {
        const result = listHelper.mostLikes(testHelper.blogNoDocs)
        assert.deepStrictEqual(result, null)
    })
})
