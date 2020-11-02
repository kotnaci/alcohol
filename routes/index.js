
const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');
const { route } = require('./order');

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/product', (req, res) => {
    res.render('product');
});

router.get('/contacts', (req, res) => {
    res.render('contacts')
});

router.use('/alcohols', require('./alcohol'));
router.use('/admin',  require('./dashboard'));
router.use('', require('./users'));
router.use('/cart', require('./cart'));
router.use('/order', require('./order'));






module.exports = router;