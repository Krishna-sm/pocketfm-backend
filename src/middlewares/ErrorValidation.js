const { validationResult } = require("express-validator")
const ApiError = require("../utils/ApiError")
const httpStatus = require("http-status")

exports.ErrorValidation = async(req,res,next)=>{
    const result = await validationResult(req)

        if(!result.isEmpty()){
            
            const error = String(result.array().map((c)=>c.msg)[0]) 
            next(new ApiError(httpStatus.BAD_REQUEST,error))

            return
        }
        next()
}