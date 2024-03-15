const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { UserModel } = require("../models");
const { userTypes } = require("../constant");

exports.VerifyAdmin = async(req,res,next)=>{
    try {

                    const userId = req?.user;
                    if(!userId){
                        next(new ApiError(httpStatus.UNAUTHORIZED,"Details1 Not Valid"))
                        return
                    }

                    const validation = await UserModel.findById(userId);
                    if(!validation || validation.user_type!==userTypes.admin_user){
                                    next(new ApiError(httpStatus.UNAUTHORIZED,"Details2 Not Valid"))
                        return
                    }

                    next()

    } catch (error) {
            next(error)
    }
}