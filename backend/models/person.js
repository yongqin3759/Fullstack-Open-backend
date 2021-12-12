const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

console.log('connecting to', url)
// Connect to db and log if connection succeeds or fails.
mongoose.connect(url)
    .then(result =>{
        console.log('Connected to MongoDB')
    }).catch(error =>{
        console.log('error connecting to MongoDB:', error.message)
    })

// Define model which needs to be set in DB
const personSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true,minlength:3},
    number: {type: String, required: true, unique: true,match: /([^\d]*\d){8,}/},
})

// remove private _id and version parameters from backend view
personSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
    })

module.exports = mongoose.model('person', personSchema)