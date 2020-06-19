const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

//const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyparser.json());

dishRouter.route('/')
/** .all((req, res, next) =>{
    res.statusCode = 200;
    res.header = ('Content-Type', 'text/plain');
    next();
}) */
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

module.exports = dishRouter;


