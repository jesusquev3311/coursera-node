const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
//GET request
.get( (req,res,next)=>{
    Promotions.find({}).then((promotions)=>{
        res.status(200);
        res.setHeader('content-type', 'aplication/json');
        res.json(promotions)
    }, (err) => next(err))
    .catch(err => next(err));
})

//POST Method
.post( (req, res, next) =>{
    Promotions.create(req.body).then((promotion) =>{
        console.log('Promotion created');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(promotion)
    },(err) => next(err)
    .catch(err => next(err)))
})

//PUT Method
.put( (req, res, next) =>{
    res.status = 403;
    res.end('PUT operation are not supported on Promotions');
})

//DELETE Method
.delete((req, res, next) =>{
    Promotions.remove({}).then((response) =>{
        console.log('Promotions removed');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(response)
    },(err) => next(err)
    .catch(err => next(err)))
});

//single post
promoRouter.route('/:promoId')

//GET request
.get((req,res,next)=>{
    Promotions.findById(req.params.promoId).then((promotion)=>{
        res.status(200);
        res.setHeader('content-type', 'aplication/json');
        res.json(promotion)
    }, (err) => next(err))
    .catch(err => next(err));
})

//POST Method
.post((req, res, next) =>{
    res.status(403);
    res.end('POST is not supportted on Promotion: ' + req.params.promoId);
})

//PUT Method
.put( (req, res, next) =>{
    Promotions.findByIdAndUpdate(req.params.promoId, {$set: req.body},{new: true})
    .then((promotion)=>{
        res.status = 200;
        res.setHeader('content-type', 'aplication/json');
        res.json(promotion)
    }, (err) => next(err))
    .catch(err => next(err));
})

//DELETE Method
.delete((req, res, next) =>{
    Promotions.findByIdAndRemove(req.params.promoId).then((response)=>{
        console.log('Promotion removed');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(response)
    },(err) => next(err)
    .catch(err => next(err)))
});


module.exports = promoRouter;