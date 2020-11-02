const mongoose = require('mongoose'),

AlcoholSchema = mongoose.Schema;
const Alcohol = new AlcoholSchema({
    title: String,
    description: String,
    price: String,
    urlImg: String,
    count: String,
    type: String
}, {collection: 'alcohols'});

module.exports = mongoose.model('Alcohol', Alcohol);




