const express = require('express');
const router = express.Router();

router.use('/alcohols', require('./alcohol'));
router.use('/orders', require('./order'));

router.get('/', (req, res) => {
    res.redirect('/admin/alcohols');
})

module.exports = router;