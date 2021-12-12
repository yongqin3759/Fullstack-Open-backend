require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')


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
    let dateNow = getCurrentDate()
    Person.find({}).then(person =>{
        console.log(person)
        res.send(`<h2>Phonebook has info for ${person.length} people</h2><h2>${dateNow}</h2>`)
    })
})

app.get('/', (req,res)=>{
    res.send('<h1>Phonebook Backend</h1>')
})

app.get('/api/persons', (req,res)=>{
    Person.find({}).then(person =>{
        res.send(JSON.stringify(person))
    })
})

app.get('/api/persons/:id',(req,res)=>{
    Person.findById(req.params.id).then(person =>{
        res.json(person)
    })
    .catch(error=>next(error))
})


app.delete('/api/persons/:id',(req,res,next)=>{
    Person.findByIdAndRemove(req.params.id).then(person =>{
        res.status(204).end()
    })
    .catch(error=>next(error))
})



app.post('/api/persons', (req,res,next)=>{
    const body = req.body

    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    console.log(req.body)
    Person.find({name: req.body.name}).then(result=>{
        const person = new Person({
            name: body.name,
            number:body.number,
        })
        return person.save()
    }).then(savedPerson =>{
            res.json(savedPerson)
    })
    .catch(error=>{
        if(error.code != 11000){
            res.status(400).send({error: "error.message", usefulErrorMsg:"Phone number has to be at least 8 digits and Name at least 3 characters", errorObj: error})
            console.log("error kind:",error.message)
        }
        return next(error)})
    

})

app.put('/api/persons/:id', (req,res,next)=>{
    const body = req.body

    // Do NOT create a new person object, put is not overright but modify. 
    const person = {
        number: body.number,
    }
    
    Person.findByIdAndUpdate(req.params.id,person,{new:true, runValidators:true})
        .then(updatedPerson=>{
            res.json(updatedPerson)
        }).catch(error=>{
            if(error.code != 11000){
                res.status(400).send({error: "error.message", usefulErrorMsg:"Phone number has to be at least 8 digits", errorObj: error})
                console.log("error kind:",error.message)
            }
            return next(error)})
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 

    next(error)
}

app.use(errorHandler)