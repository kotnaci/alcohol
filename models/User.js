const mongoose = require('mongoose'),

UserSchema = mongoose.Schema;
const User = new UserSchema({
    fName: String,
    lName: String,
    userName: String,
    password: String,
    email: String,
    dateReg: String
}, {collection: 'users'});

module.exports = mongoose.model('User', User);