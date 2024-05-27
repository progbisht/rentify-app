const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')


// @desc - Genereate refresh and access tokens
const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
    
        const accessToken = user.generateAccessToken()
    
        const refreshToken = user.generateRefreshToken()
    

        user.refreshToken = refreshToken
        
        await user.save({ validateBeforeSave : false })

        return { accessToken, refreshToken }

    }
    catch(err){
        throw new ApiError(500, "Something went wrong while generating access or refresh token.")
    }
}

// @desc -   Register User
// @route -  POST /register
// @access - Public
const handleUserRegister = asyncHandler(async (req,res) => {
    
        const { firstName, lastName, email, phone, password } = req.body

        if( [firstName, lastName, email, phone, password].some( (field) => field?.trim === "")){
            throw new ApiError (400, "All fields are required.")
        }

        const existedUser = await User.findOne({ email })

        if(existedUser){
            throw new ApiError(409, "User with email already exists.")
        }
    
        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password
        })

        const createdUser = await User.findById(user._id).select('-password -refreshToken')

        if(!createdUser){
            throw new ApiError(500, "Something went wrong while registering a user.")
        }
        
        res.status(201).json(
            new ApiResponse(201, createdUser, "User Created successfully.")
        )
    
})


// @desc -   Login User
// @route -  POST /login
// @access - Public
const handleUserLogin = asyncHandler( async(req,res) => {

    const { email, password } = req.body;

    if( !email ){
        throw new ApiError(400, "Email is required!")
    }

    const user = await User.findOne({ email })

    if(!user){
        throw new ApiError(404, "User does not exist.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials.")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .cookie(
        "accessToken", 
        accessToken,
        options
    )
    .cookie(
        "refreshToken",
        refreshToken,
        options
    )
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken,
            },
            "User logged in successfully"
        )
    )


})


// @desc -   Logout User
// @route -  POST /logout
// @access - Private
const handleLogout = asyncHandler( async (req,res) => {
    
    await User.findByIdAndUpdate(
        req.body._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully.")
    )
})

// @desc -   Generate refresh and access tokens
// @route -  POST /refresh-token
// @access - Private
const handleRefreshAccessToken = asyncHandler( async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
    
    
        const { accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken
                },
                "Access token refreshed."
            )
        )
    } catch (error) {
        throw new ApiError(500, error.message || "Invalid refresh token")
    }

})


// @desc -   Get user profile
// @route -  POST /profile
// @access - Private
const handleGetUserProfile = asyncHandler( async (req,res) => {
        const { _id } = req.user
 
        if(!_id){
            throw new ApiError(400, "User Id is missing")
        }
        const user = await User.findById(_id)


        if(!user){
            throw new ApiError(500, "Something went wrong while fetching user profile.")
        }

        res.status(200).json(
            new ApiResponse(200, user, "User details fetched successfully")
        )
            
})






module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleLogout,
    handleRefreshAccessToken,
    handleGetUserProfile,
    
}