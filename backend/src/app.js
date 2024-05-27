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


app.use(express.static(path.join(__dirname, 'frontend', 'build')))


app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')))


// router imports and routes declaration
app.use('/api/v1/users', require('./routers/userRoutes'));
app.use('/api/v1/places', require('./routers/placeRoutes'));
app.use('/api/v1/wishlist', require('./routers/wishlistRoutes'));



module.exports = app