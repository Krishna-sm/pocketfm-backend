const httpStatus = require("http-status");
const AuthService = require("../services/Auth.service")
const catchAsync = require("../utils/CatchAsync")

class AuthController{
        static loginUser = catchAsync(async(req,res)=>{
            const res_obj = await AuthService.loginUser(req?.body);
            res.status(httpStatus.CREATED).send(res_obj)
        })

            static verifyOtp = catchAsync(async(req,res)=>{
            const res_obj = await AuthService.verifyOtp(req?.body,req?.headers['x-token']);
            res.status(httpStatus.OK).send(res_obj)
        })
           static Userprofile = catchAsync(async(req,res)=>{
            const res_obj = await AuthService.Userprofile(req?.user);
            res.status(httpStatus.OK).send(res_obj)
        })

        

        
}

module.exports = AuthController