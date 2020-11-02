const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' }, 
            (email, password, done) => {
                // Match User
                User.findOne({ email: email })
                    .then(user => {
                        if (!user) {
                            console.log('Этот email не зарегистрирован');
                            return done(null, false, { message: 'Этот email не зарегистрирован' });
                        }

                        // Match password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;

                            if(isMatch) {
                                return done(null, user);
                            } else {
                                console.log('Неверный пароль');
                                return  done(null, false, { message: 'Некорректный пароль' });
                            }
                        });
                    })
                    .catch(err => console.log(err));
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}