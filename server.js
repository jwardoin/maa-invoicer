const express = require('express')
const ejs = require('ejs')
const passport = require('passport')
const dotenv = require('dotenv')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Path to environmental variables
dotenv.config({ path: './config/config.env' })

// Passport
require('./config/passport')(passport)

// Connect to the database
connectDB()

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Sessions
app.use(session({
    secret: 'SDesd16DfnjKu',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
// app.use('/invoicer', require('./routes/invoicer'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))