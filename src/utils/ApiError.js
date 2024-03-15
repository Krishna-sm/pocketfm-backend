class ApiError extends Error{
    constructor(statusCode=500,message){
        super(message)

        this.message = message 
        this.statusCode = statusCode
            Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = ApiError