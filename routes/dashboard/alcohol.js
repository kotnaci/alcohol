const express = require('express');
const router = express.Router();
const multer = require('multer');

const { ensureAuthenticated } = require('../../config/auth');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './assets/img/alcohols')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: storage
})



const ALCOHOL = require('../../models/Alcohol');

router.get('/', (req, res) => {
   // res.render('dashboard-alcohol');
    ALCOHOL.find()
    .lean()
    .then(alcohols => {
        res.render('dashboard-alcohol', {alcohols})
    }) 
    .catch(err => {
        res.render('dashboard-alcohol', {err})
    })


})

router.get('/add', (req,res) =>{
    res.render('dashboard-alcohol-add')
})

router.post('/add', upload.single('urlImg'), (req,res) => {
    const {
        title,
        description,
        price,
        count,
        type
    } = req.body
    urlImg = "";
    console.dir(type)
    if (req.file)
    {
        urlImg = "http://localhost:8080/assets/img/alcohols/" + req.file.originalname;
    }
    else
    {
        urlImg = "http://localhost:8080/assets/img/logo.png";
    }
    const newAlcohol = new ALCOHOL({
        title,
        description,
        price,
        count,
        urlImg,
        type
    });
    newAlcohol.save()
        .then(alcohol => {
            res.redirect('/admin/alcohols')
        }) 
        .catch(alcohol => {
            res.redirect('/admin/alcohols')
        })
})
router.get('/del/:id', (req,res) => {
    ALCOHOL.findByIdAndRemove(req.params.id)
    .then(alcohol => {
        res.redirect('/admin/alcohols')
    })
    .catch(alcohol => {
        res.redirect('/admin/alcohols')
    })
})


router.get('/edit/:id', (req,res) => {
    ALCOHOL.findById(req.params.id)
    .lean()
    .then(alcohol =>{
        res.render('dashboard-alcohol-edit', {alcohol})
    })
    .catch(err => {
        res.redirect('/admin/alcohol')
    })
})

router.post('/edit/:id', upload.single('urlImg'), (req,res) => {
    const {
        title,
        description,
        price,
        count,
        type
    } = req.body;
    if (req.file)
    {
        urlImg = "http://localhost:8080/assets/img/alcohols/" + req.file.originalname;
        ALCOHOL.findByIdAndUpdate(
            {_id: req.params.id},
            {
                title: title,
                description: description,
                price: price,
                urlImg: urlImg,
                count: count,
                type: type
            },{ new: true })
            .then(alcohol => {
                res.redirect('/admin/alcohols')
            })
            .catch(alcohol => {
                res.redirect('/admin/alcohols')
            })
    }
    else
    {
        ALCOHOL.findByIdAndUpdate(
            {_id: req.params.id},
            {
                title: title,
                description: description,
                price: price,
                count: count,
                type: type
            },{ new: true })
            .then(alcohol => {
                res.redirect('/admin/alcohols')
            })
            .catch(alcohol => {
                res.redirect('/admin/alcohols')
            })
    }

    
})

module.exports = router;