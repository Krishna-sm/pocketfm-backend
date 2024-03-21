const AuthController = require('../controllers/Auth.controller')
const { ErrorValidation } = require('../middlewares/ErrorValidation') 
const AuthValidation = require('../validations/Auth.validation')
const AuthUser = require("../middlewares/Validation")
const { passPort } = require('../utils/passport')

const router = require('express').Router()


// google login
router.get('/google',
  passPort.authenticate('google', { scope: ['profile', 'email'] }));

  
// google callback
router.get('/google/callback',
        passPort.authenticate('google', { failureRedirect: process.env.FRONTEND_FAILED_URL}),
  function(req, res) {
    const user = req?.user;
    req.logOut({},(err)=>err)
    // Successful authentication, redirect home.
    res.redirect(process.env.FRONTEND_SUCCESS_URL+`/${user}`)
  }
);


router.route('/signup' )
.post(AuthValidation.loginUser,ErrorValidation,AuthController.loginUser)



router.route('/verify' )
.post(AuthValidation.verifyOtp,ErrorValidation,AuthController.verifyOtp)


router.route('/profile' )
.get(AuthUser,AuthController.Userprofile)

module.exports  = router