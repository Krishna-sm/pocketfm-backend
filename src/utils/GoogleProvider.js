const { Google_Client_id, Google_Client_screate, Google_callback } = require('../constant');
const AuthService = require('../services/Auth.service');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const google_scrategy = new GoogleStrategy({
    clientID: Google_Client_id,
    clientSecret: Google_Client_screate,
    callbackURL: Google_callback
  },
  
 async function(accessToken, refreshToken, profile, cb) {
    const data = await AuthService.GoogleLoginUser(profile)
    // Here, you can save the user profile or perform any other necessary actions
    return cb(null, data);
  }
)

module.exports = google_scrategy