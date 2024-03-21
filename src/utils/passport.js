const passport = require('passport');
const google_scrategy = require('./GoogleProvider');


passport.serializeUser(function(user, done) {
    done(null, user);
});
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// strategies
passport.use(google_scrategy)

module.exports = {passPort:passport}
