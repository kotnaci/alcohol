const mongoose = require('mongoose'),

CartSchema = mongoose.Schema;
const Cart = new CartSchema({
    items: [{
        id: string,
    }] 
}, {collection: 'cart'});

module.exports = mongoose.model('Cart', Cart);