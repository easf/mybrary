if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express') // nodejs framework
const app = express()
const expressLayouts = require('express-ejs-layouts') // package to work with views
const bodyParser = require('body-parser') // package to deal with form values easily
const mongoose = require('mongoose') // package to database package

// Importing the routes files for every resource
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors') 
const bookRouter = require('./routes/books') 


// Setting application view
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
// encode parameters/values from forms
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false })) 

// setting the database up
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Mapping bewteen relative path and router/handler/controller files
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)


app.listen(process.env.PORT || 3000)