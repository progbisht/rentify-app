const Place = require('../models/Place')
const fs = require('fs')
const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const Wishlist = require('../models/Wishlist')


// @desc - Upload photos
// @route - POST /uploads
// @access - Public
const handleUploadPlaceImage = (req, res) => {
    const uploadedFiles = []
    
    for(let i = 0; i < req.files.length; i++){
        const { path, originalname } = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)

        uploadedFiles.push(newPath.replace('./public/uploads', ''))
    }
    

    res.status(200).json(
        new ApiResponse(200, uploadedFiles, "Files uploaded successfully.")
    )
}

// @desc -   Add new place
// @route -  POST /add-place
// @access - Private
const handleAddNewPlace = asyncHandler(async (req,res) => {
   
    const { title, address, photos, description, bedRooms, bathRooms, nearby, price } = req.body


    if( [title, address, price].some( (field) => field?.trim === "")){
        throw new ApiError (400, "All fields are required.")
    }

    const existedPlace = await Place.findOne({ title })

    if(existedPlace){
        throw new ApiError(409, "Place with title already exists")
    }

    
    
    const place = await Place.create({
        owner: req.user?._id,
        title,
        address,
        photos,
        description,
        bedRooms,
        bathRooms,
        nearby,
        price,
        
    })

    const createdPlace = await Place.findById( place._id )

    if(!createdPlace){
        throw new ApiError(500,"Something went wrong while adding a place.")
    }


    return res.status(201).json(
        new ApiResponse(201, createdPlace, "Place added successfully.")
    )

    
})



// @desc -   Fetch User Places
// @route -  GET /user-places
// @access - Private
const handleUserPlaces = asyncHandler( async(req,res) => {
    const { _id } = req.user

    if(!_id){
        throw new ApiError(401, "Unauthorized request.")
    }

    const places = await Place.find({ owner: _id}).exec()

    if(!places){
        throw new ApiError(500, "Something went wrong while fetching user places.")
    }

    res.status(200).json(
        new ApiResponse(200, places, "User places fetched successfully.")
    )
    
})


// @desc -   Update Place
// @route -  PATCH /update-place
// @access - Private
const handleUpdatePlaces = asyncHandler( async(req,res) => {

    const { id, title, address, photos, description, bedRooms, bathRooms, nearby, price } = req.body

    
    if( [title, address, price].some( (field) => field?.trim === "")){
        throw new ApiError (400, "All fields are required.")
    }

    const existingPlace = await Place.findOne({ _id : id }).exec()

    if(!existingPlace){
        throw new ApiError(404, "Place not found.")
    }
    
    let updatedPlace
    if((req.user?._id).toString() === existingPlace.owner.toString()){
        updatedPlace = await Place.findByIdAndUpdate(
            id,
            {
                $set: {
                    title: title,
                    address: address,
                    photos: photos,
                    description: description,
                    bedRooms: bedRooms,
                    bathRooms: bathRooms,
                    nearby: nearby,
                    price: price
                }
    
            },
            {
                new: true
            }
    
        )
    
    }
    
    
    res.status(200).json(
        new ApiResponse(200, updatedPlace, "Place updated successfully.")
    )
})


// @desc -   Delete a place
// @route -  DELETE /delete-place
// @access - Private
const handleDeletePlace = asyncHandler( async (req, res) => {
    const { id } = req.params
    
    if(!id){
        throw new ApiError(404, "Id is required to delete a place")
    }

    const place = await Place.findOne({ _id : id }).exec()

    if(!place){
        throw new ApiError(500, "Place not found.")
    }

    const deletedPlace = await Place.deleteOne({ _id : id })

    await Wishlist.deleteMany({ place: _id })

    res.status(200).json(
        new ApiResponse(200, deletedPlace, "Place deleted successfully.")
    )


})


// @desc -   Get a single place in detail
// @route -  Get /single-place
// @access - Public
const handleGetSingleUserPlace = asyncHandler( async (req,res) => {
    
    const { id } = req.params

    if(!id){
        throw new ApiError(404, "Place not found.")
    }

    const place = await Place.findOne({ _id : id }).exec()

    if(!place){
        throw new ApiError(500, "Something went wrong while fetching user place.")
    }

    res.status(200).json(
        new ApiResponse(200, place, "User place fetched successfully.")
    )
    
})


// @desc -   Fetch all places
// @route -  POST /all
// @access - Public
const handleGetAllPlaces = asyncHandler( async (req, res) =>{
    const { page = 1, limit = 5} = req.query

    // pagination and limit the records as requested
    const places = await Place.find()
                              .skip((page - 1) * limit)
                              .limit(parseInt(limit))
    
    
    res.status(200).json(
        new ApiResponse(200, places, "Places fetched succssfully.")
    )

})


// @desc -   Fetch a single place
// @route -  Get /add-place
// @access - Public
const handleGetSinglePlace = asyncHandler (async (req, res) =>{
    const { id } = req.params

    if(!id){
        throw new ApiError(404, "Place not found.")
    }

    const place = await Place.findOne({ _id : id }).exec()
    if(!place){
        throw new ApiError(500, "Something went wrong while fetching place.")
    }
    
    res.status(200).json(
        new ApiResponse(200, place, "Place fetcehd successfully.")
    )
    
})


// @desc -   Get intrested Users
// @route -  Get /intrested
// @access - Private

const getInterestedUserProfile = asyncHandler( async(req, res) => {
    const { id } = req.params


    if(!id){
        throw new ApiError(400, "User id is missing.")
    }


    const userDetails = await Place.findOne({ _id: id }).populate({
        path: 'likedBy',
        select: '-password -refreshToken'
    }).exec()
    
    


    if(!userDetails){
        throw new ApiError(404, "No intrested user")
    }

    res.status(200)
    .json(
        new ApiResponse(
            200, userDetails.likedBy, "User details fetched successfully."
        )
    )
})


module.exports = {
    
    handleUploadPlaceImage,
    handleAddNewPlace,
    handleUserPlaces,
    handleUpdatePlaces,
    handleDeletePlace,
    handleGetSingleUserPlace,
    handleGetAllPlaces,
    handleGetSinglePlace,
    getInterestedUserProfile
}