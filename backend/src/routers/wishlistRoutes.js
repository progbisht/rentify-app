const express = require('express')
const router = express.Router()

const wishlistController = require('../controllers/wishlistController')
const verifyJWT = require('../middlewares/auth.middleware')


// routeṣ to add place to user's wishlist and fetch user wishlist 
router.route('/add').post(verifyJWT, wishlistController.handleUserWishlist)
router.route('/:id').get(verifyJWT, wishlistController.fetchWishlist)



module.exports = router


