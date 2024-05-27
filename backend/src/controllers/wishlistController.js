const Place = require('../models/Place')
const asyncHandler = require('../utils/asyncHandler')
const Wishlist = require('../models/Wishlist')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')


// @desc -   Add property to wishlist
// @route -  POST /add
// @access - Private
const handleUserWishlist = asyncHandler( async(req, res) => {

    const { place } = req.body

    if(!place){
        throw new ApiError(400, "No place to add.")
    }
    const likedPlace = await Place.findOne({ _id: place})

    if(!likedPlace){
        throw new ApiError(400, 'Place does not exist or removed.')
    }

    const alreadyAdded = await Wishlist.findOne({ user: req.user?._id })

    if(alreadyAdded){
        throw new ApiError(400, "Place already added to wishlist.")
    }

    const wishList = await Wishlist.create({
        place: place,
        user: req.user?._id
    })

    likedPlace.likedBy.push(req.user?._id)
    await likedPlace.save()

    res.status(200).json(
        new ApiResponse(200, wishList, "Place added to wishlist successfully.")
    )
    
})


// @desc -   Fetch user wishlist
// @route -  GET /
// @access - Private
const fetchWishlist = asyncHandler( async(req, res) => {
    const { id } = req.params

    const list = await Wishlist.find({ user: id }).populate({
        path: 'place',
        select: '-user'
    }).exec()

    if(!list){
        throw new ApiError(500, 'Something went wrong while fetching user wishlist.')
    }


    res.status(200).json(
        new ApiResponse(200, list, "User wishlist fetched successfully")
    )
})




module.exports = {
    handleUserWishlist,
    fetchWishlist
}
