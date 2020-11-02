const express = require('express');
const router = express.Router();

const ORDER = require('../../models/Order');
const Alcohol = require('../../models/Alcohol');
router.get('/', (req, res) => {
     ORDER.find()
     .lean()
     .then(orders => {
         res.render('dashboard-order', {orders})
     }) 
     .catch(err => {
         res.render('dashboard-order', {err})
     })
 });

router.post('/', (req, res) => {
    let {
        FIO,
        phone,
        price,
        products
    } = req.body;

    const newOrder = new ORDER({
        FIO,
        phone,
        price,
        products
    });
    newOrder.save()
        .then(order => {
            res.redirect('/admin/orders/check?id=' + order._id);
        })
        .catch(order => {
            res.redirect('/admin/orders/check?id=' + order._id);
        })
});

router.get('/check', (req, res)=> {
    
    if(req.query.id) {
        let id = req.query.id;
        res.render('check', { id });
    } else {
        res.redirect('/');
    }
    
})
 

module.exports = router;

