
const { compare } = require('bcryptjs');
const { response } = require('express');
const express = require('express');
const router = express.Router();

//alcohol model
const Alcohol = require('../../models/Alcohol');



router.get('/', (require, response)=>{
    url = require.originalUrl;
    startRem = url.indexOf('&page=');
    newUrl = url.substr(0, startRem);
    console.log(newUrl);
    const tap = 6;
    
   
    if (!require.query.type) {
        if(!require.query.page) {
            newUrl += '?';
            Alcohol.find().limit(tap).lean()
            .then(alcohols => {
                Alcohol.countDocuments((err, count) => {
                    response.redirect('/alcohols?page=1');
                    // response.render('alcohols', {alcohols, count, newUrl});
                })
            }).catch(err => {
                console.log(err)
            })
        } else {
            const page = require.query.page - 1;
            Alcohol.find().skip(page * tap).limit(tap).lean()
            .then(alcohols => {
                let currentPage = require.query.page
                Alcohol.countDocuments((err, count) => {
                    let nextPage = Number(currentPage) + 1;
                    let prevPage = currentPage - 1;
                    console.log(count);
                    response.render('alcohols', {alcohols, count, newUrl, nextPage, prevPage});
                })
            }).catch(err => {
                console.log(err)
            })
        }
    } else {
        if (!require.query.page) {
            Alcohol.find({type: require.query.type}).limit(tap).lean()
            .then(alcohols => {
                Alcohol.count({type: require.query.type}, (err, count) => {
                    if (err) console.log(err)

                    console.log(count);
                    response.render('alcohols', {alcohols, count, newUrl});
                });
            }).catch(err => {
                console.log(err)
            })
        } else {
            const page = require.query.page - 1;
            Alcohol.find({type: require.query.type}).skip(page * tap).limit(tap).lean()
            .then(alcohols => {
                Alcohol.count({type: require.query.type}, (err, count) => {
                    if (err) console.log(err)
                    let currentPage = require.query.page;
                    let nextPage = Number(currentPage) + 1;
                    let prevPage = currentPage - 1;
                    console.log(count);
                    response.render('alcohols', {alcohols, count, newUrl, nextPage, prevPage});
                });
            }).catch(err => {
                console.log(err)
            })
        }
    }
});


router.get('/:id', (require,response) => {
    Alcohol.findById(require.params.id).lean()
    .then(alcohol => {
        response.render('product', {alcohol})
    })
    .catch(err => {
        console.log(err)
    })
})



module.exports = router;