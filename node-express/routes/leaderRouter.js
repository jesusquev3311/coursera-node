const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

//all request - this will be executed before any other method
.all( (req,res, next)=>{
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    next();
})

//GET request
.get( (req,res,next)=>{
    res.end('Will send All leaders');
})

//POST Method
.post( (req, res, next) =>{
    res.end('Will add the leader: ' + req.body.name + 
    'with leaders: ' + req.body.description);
})

//PUT Method
.put( (req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation are not supported on leaders');
})

//DELETE Method
.delete((req, res, next) =>{
    res.end('This will Delete all the leaders');
});

//single post
leaderRouter.route('/:leaderId')
// Assignment 1

//Single Items 
//GET request
.get((req,res,next)=>{
    res.end('Will send details of Leader: ' + req.params.leaderId );
})

//POST Method
.post((req, res, next) =>{
    res.statusCode(403);
    res.end('POST is not supportted on Leader: ' + req.params.leaderId);
})

//PUT Method
.put( (req, res, next) =>{
    res.write('Will update the Leader: ' + req.params.leaderId)
    res.end('will update the Leader: ' + req.body.name +
    'Will update the descripton: ' + req.body.description);
})

//DELETE Method
.delete((req, res, next) =>{
    res.end('This will Delete Leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;