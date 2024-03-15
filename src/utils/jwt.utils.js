
const jwt = require("jsonwebtoken")
const ApiError = require("./ApiError")
const httpStatus = require("http-status")
const JWT_AUTH = process.env.JWT_AUTH


exports.generateOTP = ()=> String(Math.floor(Math.random() * Math.pow(10, 6))).padStart(6,'0')

exports.GenerateToken = (user)=>{
    const token = jwt.sign({userId:user},JWT_AUTH,{
        expiresIn:'30d'
    })
    return token
}



exports.GenerateOTPToken = (user,otp)=>{
    const token = jwt.sign({userId:user._id},JWT_AUTH+otp,{
        expiresIn:'30m'
    })
    return token
}



exports.VerifyJWTotken = async(token,otp)=>{
        try{
                const verify = await jwt.verify(token,JWT_AUTH+otp) 
                return verify['userId']
        }catch(e){
            throw new ApiError(httpStatus.BAD_REQUEST,"OTP Not Valid")
        }
}