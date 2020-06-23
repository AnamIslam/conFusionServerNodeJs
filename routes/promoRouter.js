const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyparser.json());

promoRouter.route('/')
.get((req, res, next) =>{
    Promotions.find({})
    .then((promotions) =>{
        console.log("Promotions Found");
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) =>{
    Promotions.create(req.body)
    .then((promotion) => {
        console.log("Promotion created", promotions);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for promotions');
})
.delete( (req, res, next) =>{
    Promotions.remove({})
    .then((resp) => {
        console.log("Deleted");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },  (err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')
.get((req, res, next) =>{
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        console.log("Found");
        console.log(promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },  (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for promotion id');
})
.put( (req, res, next) =>{
    Promotions.findByIdAndUpdate(req.params.promoId, { $set: req.body}, {new : true})
    .then((promotion) => {
        console.log("Promotion updated");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete( (req, res, next) =>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        console.log("Promotion deleted");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;
