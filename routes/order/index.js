const express = require('express');
const router = express.Router();

const Alcohol = require('../../models/Alcohol');

router.get('/', (req, res) => {
    res.render('order');
})

router.post('/', (req, res) => {
    res.send(req.body);
    
})



module.exports = router;