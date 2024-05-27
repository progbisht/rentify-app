const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()

// middlewares
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())


app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))


app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')))


// router imports and routes declaration
app.use('/api/v1/users', require('./routers/userRoutes'));
app.use('/api/v1/places', require('./routers/placeRoutes'));
app.use('/api/v1/wishlist', require('./routers/wishlistRoutes'));


// Frontend routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html' ))
})

app.all('*', (req,res) => {
    res.status(404)

    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404Error.html'))
    }
    else if(req.accepts('json')){
        res.json({ message : "Resource not found" })
    }
    else{
        res.txt("Resource not found")
    }
})



module.exports = app