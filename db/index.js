const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/graphql-crud')
        console.log("DataBase connect up")
    } catch (error) {
        console.log("DataBase not connect")
    }
}

module.exports = { connectDB }