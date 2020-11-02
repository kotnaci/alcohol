const mongoose = require('mongoose'),

OrderSchema = mongoose.Schema;
const Order = new OrderSchema({
    products: [{
        id: String, 
        count: String
    }],
    price: String,
    FIO: String,
    phone: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'cheked'
    }
}, {collection: 'orders'});

module.exports = mongoose.model('Order', Order);