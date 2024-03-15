const AuthController = require('../controllers/Auth.controller')
const { ErrorValidation } = require('../middlewares/ErrorValidation') 
const AuthValidation = require('../validations/Auth.validation')
const AuthUser = require("../middlewares/Validation")

const router = require('express').Router()

 

router.route('/signup' )
.post(AuthValidation.loginUser,ErrorValidation,AuthController.loginUser)



router.route('/verify' )
.post(AuthValidation.verifyOtp,ErrorValidation,AuthController.verifyOtp)


router.route('/profile' )
.get(AuthUser,AuthController.Userprofile)

module.exports  = router