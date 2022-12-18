const passport = require('passport');
const User = require('../user/users.model');
const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function(token, done) {
            User.findOne({_id: token.sub}, function(error, user) {
                if (error) {
                    return done(error, false);
                }
                if (user){
                    return done(null, {
                        _id:user?._id,
                        role:user?.role
                    });
                }
                return done(null, false);
            });
        }
    )
);
module.exports = passport;

