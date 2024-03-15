const passport = require('passport');


passport.serializeUser(function(user, done) {
    done(null, user);
});
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// strategies
// passport.use(GithubAuth)

module.exports = passport
