const mongoose = require('mongoose')
const { DB_NAME } = require('../../constants')


// database connection (with mongoDB) 
const dbConnection = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`,{  })
    } catch (error) {
        console.log("MongoDB connection error occured", err)
        process.exit(1)
    }
}

module.exports = dbConnection