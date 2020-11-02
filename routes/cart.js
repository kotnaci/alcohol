const e = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const ALCOHOL = require('../models/Alcohol');

router.get('/', (req,res) => {
    item = req.query.id;
    ALCOHOL.findById(item)
        .lean()
        .then(alcohols => {
            res.send(alcohols)
        })
        .catch( err => console.log(item + " not found \n error:" + err));
    // ALCOHOL.find().where('_id').in(items)
    //     .lean()
    //     .then(alcohols => {
    //         res.send(alcohols)
    //     })
    //     .catch( err => console.log(item + " not found \n error:" + err));
});



module.exports = router;