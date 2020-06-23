const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

//const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyparser.json());

dishRouter.route('/')
.get((req, res, next) =>{
    Dishes.find({})
    .then((dishes) =>{
        console.log("Dishes Found");
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) =>{
    Dishes.create(req.body)
    .then((dish) => {
        console.log("Dish created", dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for dishes');
})
.delete( (req, res, next) =>{
    Dishes.remove({})
    .then((resp) => {
        console.log("Deleted");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },  (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId')

.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        console.log("Found");
        console.log(dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    },  (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for dish id');
})
.put( (req, res, next) =>{
    Dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body}, {new : true})
    .then((dish) => {
        console.log("Dish updated");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete( (req, res, next) =>{
    Dishes.findByIdAndRemove(req.params.dishid)
    .then((resp) => {
        console.log("Dish deleted");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------

dishRouter.route('/:dishId/comments')
.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish != null)
        {
            console.log("Dishes Found");
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments);
        }
        else
        {
            err = new Error('Dish' + req.params.id + ' Not found');
            res.statusCode = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish != null)
        {
            dish.comments.push(req.body);
            dish.save()
            .then((dish)=>{
                console.log("Dishes Found");
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(dish.comments);
            }, (err)=> next(err))
            .catch((err) => next(err));
            
        }
        else
        {
            err = new Error('Dish' + req.params.id + ' Not found');
            res.statusCode = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for dishes');
})
.delete( (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null)
        {
            for( var i = (dish.comments.length-1); i>0; i-- )
            {
                dish.comments.id(dish.comments[i]._id).remove();

            }
            dish.save()
            .then((dish) =>{
                console.log("Deleted");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else{
            err = new Error('Dish '+ req.params.dishId+' not found');
            res.statusCode = 404;
            return next(err);
        }  
    },  (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments/:commentId')

.get((req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish != null && dish.comments.id(req.params.commentId) != null)
        {
            console.log("Comment Found");
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments.id(req.params.commentId));
        }

        else if(dish == null)
        {
            err = new Error('Dish' + req.params.id + ' Not found');
            res.statusCode = 404;
            return next(err);
        }
        else
        {
            err = new Error('Comment' + req.params.commentId + ' Not found');
            res.statusCode = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for dish id');
})
.put( (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish != null && dish.comments.id(req.params.commentId) != null)
        {
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating =req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment =req.body.comment;
            }
            dish.save()
            .then((dish)=>{
                console.log("Comment Updated");
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            }, (err)=> next(err))
            .catch((err) => next(err));
        }

        else if(dish == null)
        {
            err = new Error('Dish' + req.params.id + ' Not found');
            res.statusCode = 404;
            return next(err);
        }
        else
        {
            err = new Error('Comment' + req.params.commentId + ' Not found');
            res.statusCode = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
//--------------------------
.delete( (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null)
        {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) =>{
                console.log("Deleted");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else{
            err = new Error('Dish '+ req.params.dishId+' not found');
            res.statusCode = 404;
            return next(err);
        }  
    },  (err) => next(err))
    .catch((err) => next(err));
});



module.exports = dishRouter;


