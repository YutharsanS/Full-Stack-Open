const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://yutharsan:${password}@cluster0.2plsl.mongodb.net/Contacts?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {
    const contactSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', contactSchema)

    if (process.argv.length === 3) {
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person)
            })

            mongoose.connection.close()
        })
    } else if (process.argv.length === 5) {
        const newPerson = { name: process.argv[3], number: process.argv[4] }
        const dbEntry = new Person(newPerson)
        dbEntry.save().then(result => {
            console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
            mongoose.connection.close()
        })

    }
})
