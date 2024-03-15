const { body } = require("express-validator");



class ContactValidation{
     static ContactData = [
        body('email').isString().withMessage("Enter  valid email").isEmail().withMessage("email must be valid").custom((v)=>v.endsWith('gmail.com')).withMessage("Only Enter Gmail ").toLowerCase(),
        body('name').isString().withMessage("Enter  Your Name"),
        body('message').isString().withMessage("Enter  Your Message"),
        body('token').isString().withMessage("Enter  Your Token"),
    ]
}


module.exports = ContactValidation