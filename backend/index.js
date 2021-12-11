const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

// make express show static content, the page index.html and the JavaScript, etc., 
//it fetches, we need a built-in middleware from express called static.

app.use(express.static('build'))

app.use(morgan(function (tokens, req, res) {
    let bodyString = ''
    if(Object.keys(req.body).length !== 0){
        bodyString = JSON.stringify(req.body)
    }
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        bodyString
    ].join(' ')
}))

let persons = [
{ 
    "id": 1,
    "name": "Hunnibuns is the cutest", 
    "number": "040-123456"
    },
    { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
    },
    { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
    },
    { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
    },
    { 
        "id": 5,
        "name": "build and deploy scripts working", 
        "number": "39-23-6423122"
    },
    { 
        "id": 6,
        "name": "dev config server working", 
        "number": "39-23-6423122"
    },
]
const getCurrentDate = ()=>{
    let date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    const weekday = date.toLocaleString('default', {weekday: 'short'})
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(day + '-' + month + '-' + year)
    return weekday + ' '+ day + '-' + month + '-' + year + ' '+ time + '  SGT';
}
app.get('/info', (req,res)=>{
    let countPersons = persons.length
    let dateNow = getCurrentDate()
    res.send(`<h2>Phonebook has info for ${countPersons} people</h2><h2>${dateNow}</h2>`)
})

app.get('/', (req,res)=>{
    res.send('<h1>Phonebook Backend</h1>')
})

app.get('/api/persons', (req,res)=>{
    res.send(JSON.stringify(persons))
})

app.get('/api/persons/:id',(req,res)=>{
    let id = Number(req.params.id)

    let person = persons.find(person=> person.id === id)

    if(person){
        res.json(person)
    }else{
        res.status(400)
        res.send('<h1>Person not found<h1/>').end()
    }
})


app.delete('/api/persons/:id',(req,res)=>{
    let id = Number(req.params.id)
    persons = persons.filter(person=>(person.id !== id))
    res.status(204).end()
})

const generateId = () =>{
    return Math.round(Math.random()*10000000)
}


app.post('/api/persons', (req,res)=>{
    const body = req.body

    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    personAlreadyExists = persons.filter(person=>(person.name === body.name))

    if(personAlreadyExists.length>= 1){
        return res.status(400).json({
            error: 'person already exists'
        })
    }

    console.log(body)
    const person = {
        id: generateId(),
        name: body.name,
        number:body.number,
    }
    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})