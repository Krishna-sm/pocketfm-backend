const { body, header } = require("express-validator");



class AuthValidation{

        

    static loginUser = [
        body('email').isString().withMessage("Enter  valid email").isEmail().withMessage("email must be valid").custom((v)=>v.endsWith('gmail.com')).withMessage("Only Enter Gmail ").toLowerCase()
    ]
    static verifyOtp = [
        body('otp').isNumeric().withMessage("otp must be a number"),
        header('x-token').isString().withMessage("Token required").isJWT().withMessage("Unauthorized")
    ]
}

module.exports = AuthValidation