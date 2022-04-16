const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// Path to environmental variables
dotenv.config({ path: './config/config.env' })

// Connect to the database
connectDB()

const app = express()

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))