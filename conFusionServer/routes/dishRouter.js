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
    res.status(403);
    res.end('POST is not supportted on Dish: ' + req.params.dishId);
})

//PUT Method
.put( (req, res, next) =>{
    Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body},{new: true})
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

//comments 

dishRouter.route('/:dishId/comments')

//GET request
.get( (req,res,next)=>{
    Dishes.findById(req.params.dishId).then((dish)=>{
        if(dish) {
            res.status(200);
            res.setHeader('content-type', 'aplication/json');
            res.json(dish.comments)
        } else {
            err = new  Error('Dish' + req.params.dishId + 'not found');
            err.status = 404;
            return next(err);
        }
       
    }, (err) => next(err))
    .catch(err => next(err));
})

//POST Method
.post( (req, res, next) =>{
    Dishes.findById(req.params.dishId).then((dish) =>{
        if(dish != null){
            dish.comments.push(req.body);
            dish.save().then((dish)=>{
                console.log('comment created');
                res.status(200);
                res.setHeader('content-type', 'aplication/json')
                res.json(dish)
            })
        } else {
            err = new Error('Dish ' + req.params.dishId + 'Not Found');
            err.status = 404;
            return next(err);
        }
        
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
    Dishes.findById(req.params.dishId).then((dish)=>{
        if (dish) {
            for (i = (dish.comments.length - 1); i >= 0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save().then((dish) =>{
                console.log('dish comments removed');
                res.status(200);
                res.setHeader('content-type', 'aplication/json')
                res.json(dish)
            })
        } else {
            err = new Error('Dish ' + req.params.id + 'Not Found');
            err.status = 404;
            return next(err);
        }
        
    },(err) => next(err)
    .catch(err => next(err)))
});

//single comment
dishRouter.route('/:dishId/comments/:commentId')

//GET request
.get( (req,res,next)=>{
    Dishes.findById(req.params.dishId).then((dish)=>{
        if(dish && dish.comments.id(req.params.commentId)) {
            res.status(200);
            res.setHeader('content-type', 'aplication/json');
            res.json(dish.comments.id(req.params.commentId));
        } else if(!dish) {
            err = new  Error('Dish' + req.params.dishId + 'not found');
            err.status = 404;
            return next(err);
        } else {
            err = new  Error('Dish' + dish.comments.id(req.params.commentId) + 'not found');
            err.status = 404;
            return next(err);
        }
       
    }, (err) => next(err))
    .catch(err => next(err));
})

//POST Method
.post( (req, res, next) =>{
    res.statusCode = 403;
    res.end('POST operation are not supported on dishes/' + req.params.dishId +'/comments/' + req.params.commentId);
})

//PUT Method
.put( (req, res, next) =>{
    Dishes.findById(req.params.dishId).then((dish)=>{
        if (dish && dish.comments.id(req.params.commentId)){
            if (req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }

            if( req.body.comment){
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save().then((dish)=>{
                console.log('dish comments updated');
                res.status(200);
                res.setHeader('content-type', 'aplication/json')
                res.json(dish)
            })

        }else if(!dish) {
            err = new  Error('Dish' + req.params.dishId + 'not found');
            err.status = 404;
            return next(err);
        } else {
            err = new  Error('Dish' + dish.comments.id(req.params.commentId) + 'not found');
            err.status = 404;
            return next(err);
        }
    },(err) => next(err))
    .catch(err => next(err) )
})

//DELETE Method
.delete((req, res, next) =>{
    Dishes.findById(req.params.dishId).then((dish)=>{
        if (dish && dish.comments.id(req.params.commentId)) {
            dish.comments.id(req.params.commentId).remove();
            dish.save().then((dish) =>{
                console.log('dish comment '+ req.params.commentId +' removed');
                res.status(200);
                res.setHeader('content-type', 'aplication/json')
                res.json(dish)
            })
        } else if(!dish) {
            err = new Error('Dish ' + req.params.id + 'Not Found');
            err.status = 404;
            return next(err);
        }else {
            err = new Error('Dish ' + req.params.id + 'Not Found');
            err.status = 404;
            return next(err);
        }
        
    },(err) => next(err)
    .catch(err => next(err)))
});


module.exports = dishRouter;