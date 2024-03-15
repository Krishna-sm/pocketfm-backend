const httpStatus = require("http-status")
const ApiError = require("../utils/ApiError")

const jwt = require("jsonwebtoken")
const JWT_AUTH = process.env.JWT_AUTH
const AuthValidation = async(req,res,next)=>{
    try {
        
        const headersToken = req.headers['authorization'] || ''
        if(!headersToken || !headersToken.startsWith("Bearer ")){
                next(new ApiError(httpStatus.UNAUTHORIZED,"please Login First"))
            return 
        } 
        const token = headersToken.split(" ")[1]
        if(!token){
             next(new ApiError(httpStatus.UNAUTHORIZED,"invalid token"))
            return 
        }

        const verify = await jwt.verify(token,JWT_AUTH)
               if(!verify.userId){
                next(new ApiError(httpStatus.NOT_FOUND,"Details Not Found"))
               }
        req.user = verify.userId
        
            next()
    } catch (error) {
            next(error)
    }
}

module.exports = AuthValidation