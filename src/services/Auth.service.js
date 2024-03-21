const httpStatus = require("http-status")
const { UserModel, ProfileModel, OtpModel } = require("../models")
const ApiError = require("../utils/ApiError")
const { generateOTP, GenerateOTPToken, VerifyJWTotken, GenerateToken } = require("../utils/jwt.utils")
const { CustomERROR, LOGIN_TRY_LIMIT, CurrentDay, userTypes } = require("../constant")
const moment = require('moment');
const { sendEmail } = require("../utils/nodemailer")
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

          await  sendEmail({email:email,otp:otp})

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

      if (todayDocument && todayDocument.try_limit >= LOGIN_TRY_LIMIT && checkExist.user_type!==userTypes.admin_user) {
  throw new ApiError(httpStatus.BAD_REQUEST,"Login attempts limit exceeded for today");
}

            // await send otp function
                 await  sendEmail({email:email,otp:otp})

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
        // const profile = await ProfileModel.findOne({user:checkExistUser._id});

            return {
                user:checkExistUser
            }

    }

    static async GoogleLoginUser(profile){
                 
               
        if(!profile?._json.email){
                        throw new ApiError(httpStatus.UNAUTHORIZED,"Details Not Valid")
                    }
                const existUser = await UserModel.findOne({email:profile?._json.email})

                if(existUser){
                               
                            await UserModel.findByIdAndUpdate(existUser._id,{name:profile._json.name, user_type:userTypes.google_user})
                              const logintoken = await GenerateToken(existUser._id)
            return logintoken
                }

                const obj = {}

                if(profile._json.name){
                    obj['name'] = profile._json.name
                }

                        const user =     await UserModel.create({
                                ...obj,
                                email:profile?._json.email,
                                user_type:userTypes.google_user
                            })

                              await ProfileModel.create({
                user:user._id
            })
                 const logintoken = await GenerateToken(user._id)
            return logintoken

    }       

}

module.exports = AuthService