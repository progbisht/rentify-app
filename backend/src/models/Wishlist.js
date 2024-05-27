const mongoose = require('mongoose')


const wishlistSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})


module.exports = mongoose.model('Wishlist', wishlistSchema)