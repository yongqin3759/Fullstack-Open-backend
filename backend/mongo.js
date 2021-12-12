const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password (name and phoneNumber optional) as an arguments: node mongo.js <password> <name> <phoneNumber>')
  process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3];
const number = process.argv[4]

const url = `mongodb+srv://13tanamatef:${password}@cluster0.0k5jl.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})



const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
    Person.find({}).then(result =>{
        result.forEach(person => {
            console.log(person)
          })
        mongoose.connection.close()
    })
}else if (process.argv.length == 5){
    const person = new Person({
        name: name,
        number: number,
      })
      
    person.save().then(result =>{
        console.log(`Added ${name} with phone number ${number} to phonebook`)
        mongoose.connection.close()
    })
}else{
    console.log('Please provide the password (name and phonNumber optional) as an arguments: node mongo.js <password> <name> <phonNumber>')
    process.exit(1)
}



