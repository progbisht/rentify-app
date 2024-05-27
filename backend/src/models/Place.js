const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
        unique: true,
        required: true, 
        trim: true
    },
    
    address: {
        type: String,
        required: true,
        trim: true
    },

    photos: [{
        type: String
    }],

    description: {
        type: String,
        required: true
    },

    bedRooms: {
        type: Number,
    },

    bathRooms: {
        type: Number,
    },

    nearby: [String],

    price: {
        type: Number,
        requried: true
    },

    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Place', placeSchema)