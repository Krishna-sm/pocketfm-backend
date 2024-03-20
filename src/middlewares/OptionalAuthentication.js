const httpStatus = require("http-status")
const ApiError = require("../utils/ApiError")

const jwt = require("jsonwebtoken")
const JWT_AUTH = process.env.JWT_AUTH
const OptionalAuthentication = async(req,res,next)=>{
    try {
        
        const headersToken = req.headers['authorization'] || ''
        if(!headersToken || !headersToken.startsWith("Bearer ")){
            req.user = null
                 next()
            return 
        } 
        const token = headersToken.split(" ")[1]
        if(!token){
            req.user = null

            next()
            return 
        }

        const verify = await jwt.verify(token,JWT_AUTH)
        req.user = verify.userId
        
            next()
    } catch (error) {
            req.user = null
            next()
    }
}

module.exports = OptionalAuthentication