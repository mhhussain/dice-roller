const { Router } = require('express');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./users');
const logger = require('../logger').logger('auth');

const configs = require('../configs');

mongoose.connect(configs.MONGODB_URI);

const passportSetup = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        Users.findOne({ _id: id }, '-password -salt', (e, user) => {
            done(e, user);
        });
    });

    // Local Register
    passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        process.nextTick(() => {
            Users.findOne({ 'email': email }, (e, user) => {
                if (e) {
                    logger.error(e);
                    return done(e);
                }

                if (user) {
                    return done(null, false, `User ${email} already exists`);
                } else {
                    var newUser = new Users();
                    newUser.username = email;
                    newUser.email = email;
                    const salt = newUser.generateSalt();
                    newUser.password = newUser.generateHash(password, salt);
                    newUser.salt = salt;

                    newUser.save((e) => {
                        if (e) {
                            throw e;
                        }

                        logger.info(`New user ${newUser.username} created`);
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    // Local Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        process.nextTick(() => {
            Users.findOne({ 'email': email }, (e, user) => {
                if (e) {
                    logger.error(e);
                    return done(e);
                }
    
                if (!user) {
                    return done(null, false, 'No user found');
                }
    
                if (!user.validPassword(password)) {
                    logger.info(`Failed login for user ${user.username}`);
                    return done(null, false, 'Password invalid');
                }
    
                logger.info(`User ${user.email} logged in`);
                return done(null, user);
            })
        });   
    }));
};

// Routegaurd to verify that request is authenticated
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Security router to easily attach /register and /login routes
const securityRouter = (passport) => {
    const router = Router();

    // Register route
    router.route('/register').post(passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/register?message=register-failed',
    }));

    // Login route
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login?message=login-failed',
    }));

    return router;
};

module.exports = {
    setup: passportSetup,
    isAuth,
    router: securityRouter,
};
