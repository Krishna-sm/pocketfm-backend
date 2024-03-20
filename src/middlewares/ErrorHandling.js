const httpStatus = require("http-status")
const ApiError = require("../utils/ApiError")

exports.ErrorHandling = async(err,req,res,next)=>{
        if(err instanceof ApiError){
            res.status(err.statusCode).send({
                code:err.statusCode,
                message:err.message,
                stack:err.stack
            })
            return 
        }
         res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                code:httpStatus.INTERNAL_SERVER_ERROR,
                message:err.message,
                stack:err.stack
            })
}
