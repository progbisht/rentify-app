const express = require('express')
const cors = require('cors')
const corsOptions = require('./src/config/corsOptions')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()

// middlewares
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())
app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')))


// router imports and routes declaration
app.use('/api/v1/users', require('./src/routers/userRoutes'));
app.use('/api/v1/places', require('./src/routers/placeRoutes'));
app.use('/api/v1/wishlist', require('./src/routers/wishlistRoutes'));



module.exports = app