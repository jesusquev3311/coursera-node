const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('./../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')

//GET request
.get( (req,res,next)=>{
    Dishes.find({}).then((dishes)=>{
        res.status(200);
        res.setHeader('content-type', 'aplication/json');
        res.json(dishes)
    }, (err) => next(err))
    .catch(err => next(err));
})

//POST Method
.post( (req, res, next) =>{
    Dishes.create(req.body).then((dish) =>{
        console.log('dish created');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(dish)
    },(err) => next(err)
    .catch(err => next(err)))
})

//PUT Method
.put( (req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation are not supported on dishes');
})

//DELETE Method
.delete((req, res, next) =>{
    Dishes.remove({}).then((response) =>{
        console.log('dishes removed');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(response)
    },(err) => next(err)
    .catch(err => next(err)))
});

//single post
dishRouter.route('/:dishId')
// Assignment 1

//Single Items 
//GET request
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId).then((dish)=>{
        res.status(200);
        res.setHeader('content-type', 'aplication/json');
        res.json(dish)
    }, (err) => next(err))
    .catch(err => next(err));
})

//POST Method
.post((req, res, next) =>{
    res.statusCode(403);
    res.end('POST is not supportted on Dish: ' + req.params.dishId);
})

//PUT Method
.put( (req, res, next) =>{
    Dishes.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
    .then((dish)=>{
        res.status(200);
        res.setHeader('content-type', 'aplication/json');
        res.json(dish)
    }, (err) => next(err))
    .catch(err => next(err));
})

//DELETE Method
.delete((req, res, next) =>{
    Dishes.findByIdAndRemove(req.params.dishId).then((response)=>{
        console.log('dishes removed');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(response)
    },(err) => next(err)
    .catch(err => next(err)))
});

module.exports = dishRouter;