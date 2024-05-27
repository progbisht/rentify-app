const express = require('express')

const router = express.Router()
const multer = require('multer')
const placeController = require('../controllers/placeController')
const verifyJWT  =require('../middlewares/auth.middleware')


const photosMiddleware = multer({ dest: './public/uploads/'})

//route to upload photos 
router.route('/upload').post(verifyJWT, photosMiddleware.array('photos', 100), placeController.handleUploadPlaceImage)

// routes to create update and delete a place
router.route('/add-place').post(verifyJWT, placeController.handleAddNewPlace)
router.route('/update-place').patch(verifyJWT, placeController.handleUpdatePlaces)
router.route('/delete-place/:id').delete(verifyJWT, placeController.handleDeletePlace)

// routes to fetch user places
router.route('/user-places').get(verifyJWT, placeController.handleUserPlaces)
router.route('/user-single-place/:id').get(verifyJWT, placeController.handleGetSingleUserPlace)

// route to fetch all places
router.route('/all').get(placeController.handleGetAllPlaces)
router.route('/single-place/:id').get(placeController.handleGetSinglePlace)

// route to fetch intrested peoples
router.route('/interested/:id').get(verifyJWT, placeController.getInterestedUserProfile)


module.exports = router