const httpStatus = require("http-status")
const { UserModel, ProfileModel, OtpModel } = require("../models")
const ApiError = require("../utils/ApiError")
const { generateOTP, GenerateOTPToken, VerifyJWTotken, GenerateToken } = require("../utils/jwt.utils")
const { CustomERROR, LOGIN_TRY_LIMIT, CurrentDay } = require("../constant")
const moment = require('moment');
class AuthService{

     static  async loginUser(body){

        const {email} = body
        const response = (msg,otp,token)=>({
            msg,
            otp,
            token
        })

        const checkExist = await UserModel.findOne({email})
               const otp = generateOTP()
        if(!checkExist){
           const user =  await UserModel.create({
                email:email
            })
             await ProfileModel.create({
                user:user._id
            })
     
            // await send otp function

            await OtpModel.create({
                    user:user._id,
                    otp:otp,
                    try_limit:1,
                    purpose:'first time visit'
            })
                    const token = GenerateOTPToken(user._id,otp)
            return response('OTP Send Successfully',otp,token)
        }

        // check already blocked
        if(checkExist.isBlock){
            throw new ApiError(httpStatus.BAD_REQUEST,CustomERROR.ACCOUNT_BLOCKED)
            return
        }
        // check try limit 

        // const otpModel = await OtpModel.findOne({user:checkExist._id})
            const todayDocument = await OtpModel.findOne({
                user:checkExist._id,
            createdAt: { $gte: CurrentDay.toDate() },
            }).exec();

      if (todayDocument && todayDocument.try_limit >= LOGIN_TRY_LIMIT) {
  throw new ApiError(httpStatus.BAD_REQUEST,"Login attempts limit exceeded for today");
}

            // await send otp function

        if(todayDocument){
            await OtpModel.findByIdAndUpdate({_id:todayDocument._id},{
                   $inc: { try_limit: 1 } 

            })
                    const token = GenerateOTPToken(checkExist._id,otp)

            return response('OTP Send Successfully',otp,token)

        }
 
            await OtpModel.create({
                    user:checkExist._id,
                    otp:otp,
                    try_limit:1,
                    purpose:'logged in user visiting'
            })
 const token = GenerateOTPToken(checkExist._id,otp)
            
            return response('OTP Send Successfully',otp,token)





    }

    static async verifyOtp(body,token){
            const {otp} = body

            const verified_data = await VerifyJWTotken(token,otp);
            if(!verified_data){
                throw new ApiError(httpStatus.BAD_REQUEST,"Data Not Valid")
            }
            const checkExistModel = await OtpModel.findOneAndUpdate({otp,user:verified_data},{
                isVerified:true
            })
            if(checkExistModel?.isVerified){
                throw new ApiError(httpStatus.BAD_REQUEST,"Otp Already Verified")
            }

            const logintoken = await GenerateToken(verified_data)
            return {
                msg:"Login Success",
                   token: logintoken
            }

    }

    static async Userprofile(user){
                console.log(user);
        const checkExistUser = await UserModel.findById(user).select("user_type name email ")
        if(!checkExistUser){
            throw new ApiError(httpStatus.NOT_FOUND,"User Not Found");
            return
        }
        const profile = await ProfileModel.findOne({user:checkExistUser._id});

            return {
                user:checkExistUser
            }

    }

}

module.exports = AuthService