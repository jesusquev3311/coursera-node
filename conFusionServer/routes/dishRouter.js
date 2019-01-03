const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')

//all request - this will be executed before any other method
.all( (req,res, next)=>{
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    next();
})

//GET request
.get( (req,res,next)=>{
    res.end('Will send All Dishes');
})

//POST Method
.post( (req, res, next) =>{
    res.end('Will add the dish: ' + req.body.name + 
    'with details: ' + req.body.description);
})

//PUT Method
.put( (req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation are not supported on dishes');
})

//DELETE Method
.delete((req, res, next) =>{
    res.end('This will Delete all the dishes');
});

//single post
dishRouter.route('/:dishId')
// Assignment 1

//Single Items 
//GET request
.get((req,res,next)=>{
    res.end('Will send details of dish: ' + req.params.dishId );
})

//POST Method
.post((req, res, next) =>{
    res.statusCode(403);
    res.end('POST is not supportted on Dish: ' + req.params.dishId);
})

//PUT Method
.put( (req, res, next) =>{
    res.write('Will update the Dish: ' + req.params.dishId)
    res.end('will update the Dish: ' + req.body.name +
    'Will update the descripton: ' + req.body.description);
})

//DELETE Method
.delete((req, res, next) =>{
    res.end('This will Delete the dish: ' + req.params.dishId);
});

module.exports = dishRouter;