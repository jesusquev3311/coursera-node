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
    res.end('Will add the dish: ' + req.boyd.name + 
    'with details: ' + req.body.description);
})

//PUT Method
app.put( (req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation are not supported on dishes');
})

//DELETE Method
.delete((req, res, next) =>{
    res.end('This will Delete all the dishes');
});

module.exports = dishRouter;