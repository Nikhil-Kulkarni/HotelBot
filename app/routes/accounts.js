const app = module.exports = require('express')();
const passport = require('./passport');

app.post('/login', 
    passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/login',
                                    failureFlash: true })
);