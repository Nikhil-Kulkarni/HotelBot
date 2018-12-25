const passport = module.exports = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { isEmpty } = require('lodash');
const { fetchUser, fetchUserById } = require('../db/dbclient');

passport.use(new LocalStrategy(
    function (username, password, done) {
        fetchUser(username, password)
            .then((data) => {
                if (isEmpty(data)) {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }
                return done(null, data[0]);
            });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    console.log('deserializing');
    fetchUserById(id)
        .then((data) => {
            console.log(data);
            if (isEmpty(data)) {
                done('Invalid session');
            }

            done(null, data[0]);
        });
});