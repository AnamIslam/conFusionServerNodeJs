const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const Favourites = require('../models/favourite');
const authenticate = require('../authenticate');

const favouriteRouter = express.Router();

favouriteRouter.use(bodyparser.json());

favouriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) =>{
    Favourites.find({})
    .populate('dishes')
    .populate('user')
    .then((favourites) =>{
        //var user;
        if(favourites)
        {
            var user_favourites = favourites.filter( fav => fav.user._id.toString() === req.user.id.toString())[0]; //I have no idea!!!
            if(!user_favourites)
            {
                var err = new Error("You have no favourite");
                err.status = 404;
                return next(err);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(user_favourites);
        }
        else
        {
            var err = new Error("You have no favourite");
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favourites.find({})
    .populate('dishes')
    .populate('user')
    .then((favourites) => {
        var user;
        if(favourites)
        {
            user = favourites.filter( fav => fav.user._id.toString() === req.user._id.toString())[0];
        }
        if(!user)
        {
            user = new Favourites({user: req.user._id});
        }
        for ( let i of req.body)
        {
            if(user.dishes.find((d_id) =>{
                if(d_id.id){
                    return d_id._id.toString() === i._id.toString();
                }
            }))
        continue;
        user.dishes.push(i._id);
        }

        user.save()
        .then((userfavs) => {
            res.statusCode = 201;
            res.setHeader('Content-Type','application/json');
            res.json(userfavs);
            console.log("Favourites created");
        }, (err) => next(err))
        .catch((err) => next(err));

    }, (err) => next(err))
    .catch((err) => next(err));
})

.put( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for dishes');
})

.delete( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favourites.find({})
    .populate('dishes')
    .populate('user')
    .then((favourites) => {
        var favRemove;
        if(favourites)
        {
            favRemove = favourites.filter( fav => fav.user._id.toString() === req.user.id.toString())[0];
        }

        if(favRemove)
        {
            favRemove.remove()
            .then((result) =>{
                console.log("Favourites Deleted");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
        }
        else
        {
            var err = new Error("You have no favourite");
            err.statusCode = 404;
            return next(err);            
        }

    }, (err) => next(err))
    .catch((err) => next(err));
});

favouriteRouter.route('/:dishId')
.options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) =>{
    Favourites.find({})
    .populate('dishes')
    .populate('user')
    .then((favourites) =>{
        //var user;
        if(favourites)
        {
            var user_favourites = favourites.filter( fav => fav.user._id.toString() === req.user.id.toString())[0]; //I have no idea!!!
            var dish = user_favourites.filter( dish => dish.id === req.params.dishId)[0];
            if(dish)
            {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
                
            }
            else
            {
                var err = new Error('You do not have this dish :' + req.param.dishId);
                err.status = 404;
                return next(err);
            }
            
        }
        else
        {
            var err = new Error("You have no favourite");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favourites.find({})
    .populate('dishes')
    .populate('user')
    .then((favourites) => {
        var user;
        if(favourites)
        {
            user = favourites.filter( fav => fav.user._id.toString() === req.user.id.toString())[0];
        }
        if(!user)
        {
            user = new Favourites({user: req.user._id});
        }    
        if(user.dishes.find((d_id) =>{
            if(d_id._id){
                return d_id._id.toString() === req.params.dishId.toString();
            }
        }))
        user.dishes.push(req.params.dishId);
        

        user.save()
        .then((userfavs) => {
            res.statusCode = 201;
            res.setHeader('Content-Type','application/json');
            res.json(userfavs);
            console.log("Favourites created");
        }, (err) => next(err))
        .catch((err) => next(err));
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for dishes');
})

.delete( cors.corsWithOptions, authenticate.verifyUser, (req, res, next) =>{
    Favourites.find({})
    .populate('dishes')
    .populate('user')
    .then((favourites) => {
        var user;
        if(favourites)
        {
            user = favourites.filter( fav => fav.user._id.toString() === req.user._id.toString())[0];
        }
        if(user)
        {
            user.dishes = user.dishes.filter( (dishId) => dishId._id.toString() !== req.params.dishId);
            user.save()
            .then((result) =>{
                console.log("Favourites Deleted");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else
        {
            var err = new Error("You have no favourite");
            err.status = 404;
            return next(err);            
        }

    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = favouriteRouter;