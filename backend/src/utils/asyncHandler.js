const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try{
            await requestHandler(req, res, next)
            
        }
        catch(err){
            console.log(err);
            res.status(err.statusCode).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = asyncHandler

