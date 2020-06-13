const express = require('express');
const bodyparser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyparser.json());

dishRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.header = ('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('Will send the dishes for you');
})
.post( (req, res, next) =>{
    res.end('Will add the dish ' + req.body.name +' with description: '+ req.body.description);
})
.put( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for dishes');
})
.delete( (req, res, next) =>{
    res.end('Will delete the dishes for you');
});

dishRouter.route('/:dishid')

.get((req, res, next) =>{
    res.end('Will send the dishes for you');
})
.post( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for dish id');
})
.put( (req, res, next) =>{
    res.end('Will update the dish ' + req.body.name +' with description: '+ req.body.description);
})
.delete( (req, res, next) =>{
    res.end('Will delete the dish for you');
});

module.exports = dishRouter;


