const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyparser.json());

leaderRouter.route('/')
.get((req, res, next) =>{
    Leaders.find({})
    .then((leaders) =>{
        console.log("Leaders Found");
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) =>{
    Leaders.create(req.body)
    .then((leader) => {
        console.log("Leader created", leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for /leaders');
})
.delete( (req, res, next) =>{
    Leaders.remove({})
    .then((resp) => {
        console.log("Deleted");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },  (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.get((req, res, next) =>{
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        console.log("Found");
        console.log(leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    },  (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for leader id');
})
.put( (req, res, next) =>{
    Leaders.findByIdAndUpdate(req.params.leaderId, { $set: req.body}, {new : true})
    .then((leader) => {
        console.log("Leader updated");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete( (req, res, next) =>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        console.log("Leader deleted");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;


