const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express(); 


// Passport config
const secretKey = require('./config/secret').SECRET;
require('./config/passport')(passport);

//database config
const dataBase = require ('./config/keys').MONGO_URL;

//Connect to Mongo
mongoose.connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err)); 
    
//Static Files
app.use('/assets', express.static(__dirname + "/assets"));


//EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

//Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
// app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Express Session
app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true
}));

//Connect fash
app.use(flash());

//Routes
app.use('/', require('./routes'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));

