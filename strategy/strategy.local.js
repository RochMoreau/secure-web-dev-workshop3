const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../user/users.model');
const usersService = require('../user/users.service');

passport.use(new Strategy(function (username, password, done) {
        User.findOne({ username }, async function (error, user) {
            if (error) {
                return done(error)
            }
            if (!user)  {
                console.log("User not found");
                return done(null, false);
            }
            if (!await usersService.verify(username, password)){
                console.log("Wrong pass");
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

module.exports = passport