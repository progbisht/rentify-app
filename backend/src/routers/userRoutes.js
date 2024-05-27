const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middlewares/auth.middleware')

// routes to create, authenticate and refresh user's token
router.route('/register').post(userController.handleUserRegister)
router.route('/login').post(userController.handleUserLogin)
router.route('/refresh-token').post(userController.handleRefreshAccessToken)
router.route('/logout').post(verifyJWT, userController.handleLogout)

// route to fetch user profile
router.route('/profile').get(verifyJWT, userController.handleGetUserProfile)


module.exports = router