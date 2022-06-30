const mongoose = require('mongoose')

// Function to establish connect with database
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected - ${connect.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

// Exporting function to be called at server start

module.exports = connectDB 