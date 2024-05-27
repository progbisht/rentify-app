require('dotenv').config()
const mongoose = require('mongoose')
const dbConnection = require('./src/config/dbConnection')
const app = require('./app')

dbConnection()


mongoose.connection.once('open', ()=> {
    console.log(`Connected to database.`);
    app.listen(4000, ()=>{
        console.log(`Server running at port 4000`);
    })
})