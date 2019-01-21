const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

leaderRouter.route('/')
//GET request
.get( (req,res,next)=>{
   Leaders.find({}).then((leaders)=>{
        res.status(200);
        res.setHeader('content-type', 'aplication/json');
        res.json(leaders)
    }, (err) => next(err))
    .catch(err => next(err));
})

//POST Method
.post( (req, res, next) =>{
   Leaders.create(req.body).then((leader) =>{
        console.log('Leader created');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(leader)
    },(err) => next(err)
    .catch(err => next(err)))
})

//PUT Method
.put( (req, res, next) =>{
    res.status = 403;
    res.end('PUT operation are not supported onLeaders');
})

//DELETE Method
.delete((req, res, next) =>{
   Leaders.remove({}).then((response) =>{
        console.log('Leaderss removed');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(response)
    },(err) => next(err)
    .catch(err => next(err)))
});

//single post
leaderRouter.route('/:leaderId')

//GET request
.get((req,res,next)=>{
   Leaders.findById(req.params.leaderId).then((leader)=>{
        res.status(200);
        res.setHeader('content-type', 'aplication/json');
        res.json(leader)
    }, (err) => next(err))
    .catch(err => next(err));
})

//POST Method
.post((req, res, next) =>{
    res.status(403);
    res.end('POST is not supportted on Leader: ' + req.params.leaderId);
})

//PUT Method
.put( (req, res, next) =>{
   Leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body},{new: true})
    .then((leader)=>{
        res.status = 200;
        res.setHeader('content-type', 'aplication/json');
        res.json(leader)
    }, (err) => next(err))
    .catch(err => next(err));
})

//DELETE Method
.delete((req, res, next) =>{
   Leaders.findByIdAndRemove(req.params.leaderId).then((response)=>{
        console.log('Leader removed');
        res.status(200);
        res.setHeader('content-type', 'aplication/json')
        res.json(response)
    },(err) => next(err)
    .catch(err => next(err)))
});




module.exports = leaderRouter;