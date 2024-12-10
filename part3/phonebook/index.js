require('dotenv').config()
const Contact = require('./models/contact')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('content', (request, response) => {
    const body = request.body
    return JSON.stringify(body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


app.get('/', (request, response) => {
    response.send("<h1>Persons</h1>")
})

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(res => response.json(res))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then(
        (savedNote) => {
            response.json(savedNote)
        }
    )
})

app.get('/info', (request, response) => {
    const dateTime = new Date();
    const result =
    `
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${dateTime.toString()}</p>
    `
    response.send(result)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = Contact.findById(request.params.id)
        .then(res => response.json(res))
        .catch(error => {
            console.log(error)
            response.status(404).end()
        })
})

app.put('/api/persons/:id', (request, response) => {
    const  body = request.body
    const id = request.params.id
    const newContact = {
        name: body.name,
        number: body.number
    }

    Contact.findByIdAndUpdate(id, newContact, {new: true, runValidators: true}).then(res => response.json(res))
})

app.delete('/api/persons/:id', async (request, response) => {
    const id = request.params.id
    Contact.findByIdAndDelete(id).then(
        deletion => {
            if (deletion) {
                response.json(`deleted ${id}`)
            } else {
                response.json(`$(id) not found`)
            }
        }
    )
})

app.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`)
})