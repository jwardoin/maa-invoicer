const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Path to environmental variables
dotenv.config({ path: './config/config.env' })

// Passport
require('./config/passport')(passport)

// Connect to the database
connectDB()

const app = express()

app.set('view engine', '.ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/invoicer', require('./routes/invoicer'))

app.listen(process.env.PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))