const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

//all request - this will be executed before any other method
.all( (req,res, next)=>{
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    next();
})

//GET request
.get( (req,res,next)=>{
    res.end('Will send All promotions');
})

//POST Method
.post( (req, res, next) =>{
    res.end('Will add the promotion : ' + req.body.name + 
    'with details: ' + req.body.description);
})

//PUT Method
.put( (req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation are not supported on promotions ');
})

//DELETE Method
.delete((req, res, next) =>{
    res.end('This will Delete all the promotions ');
});

//single post
promoRouter.route('/:promoId')
// Assignment 1

//Single Items 
//GET request
.get((req,res,next)=>{
    res.end('Will send details of promotion: ' + req.params.promoId );
})

//POST Method
.post((req, res, next) =>{
    res.statusCode(403);
    res.end('POST is not supportted on promotion: ' + req.params.promoId);
})

//PUT Method
.put( (req, res, next) =>{
    res.write('Will update the promotion: ' + req.params.promoId)
    res.end('will update the promotion: ' + req.body.name +
    'Will update the promotion descripton: ' + req.body.description);
})

//DELETE Method
.delete((req, res, next) =>{
    res.end('This will Delete the promotion: ' + req.params.promoId);
});

module.exports = promoRouter;