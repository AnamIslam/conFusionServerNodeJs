const express = require('express');
const bodyparser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyparser.json());

promoRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.header = ('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('Will send the promotions for you');
})
.post( (req, res, next) =>{
    res.end('Will add the promotions ' + req.body.name +' with description: '+ req.body.description);
})
.put( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for promotions');
})
.delete( (req, res, next) =>{
    res.end('Will delete the promotions for you');
});

promoRouter.route('/:promoid')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.header = ('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('Will send the promotion for you');
})
.post( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for promotion id');
})
.put( (req, res, next) =>{
    res.end('Will update the promotion ' + req.body.name +' with description: '+ req.body.description);
})
.delete( (req, res, next) =>{
    res.end('Will delete the promotion for you');
});

module.exports = promoRouter;


