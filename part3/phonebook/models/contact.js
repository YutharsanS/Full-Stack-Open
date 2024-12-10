require('dotenv').config()
const { MongoNetworkError } = require('mongodb')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)

mongoose.connect(url)
    .then(result => { console.log('Connected to MongoDB') })
    .catch (error => {
        console.log('error connecting to MongoDB', error)
    })

const noteSchema = new mongoose.Schema(
    {
        name: {type: String, required: [true, 'name is required'], unique: true},
        number: {type: String, required: [true, 'number is required'] },
    }
)

noteSchema.set('toJSON', {
    transform: (document, output) => {
        output.id = document._id.toString()
        delete output._id
        delete output.__v
    }
})

module.exports = mongoose.model('Contact', noteSchema)