const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
require('dotenv').config()

const connection = require('./db/connection')
const Task = require('./models/Task')
const taskRoutes = require('./routes/taskRoutes')

//config handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static('public'))
//body parser, necessario para se trabalhar com forms
app.use(express.urlencoded({ extended: true }))

app.use('/tasks',taskRoutes)

connection.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log('running on port 3000')
    })
})
.catch((err)=>{
    console.log('err: '+err)
})