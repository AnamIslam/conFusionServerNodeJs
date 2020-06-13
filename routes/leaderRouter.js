const express = require('express');
const bodyparser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyparser.json());

leaderRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.header = ('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('Will send the leaders for you');
})
.post( (req, res, next) =>{
    res.end('Will add the leader ' + req.body.name +' with description: '+ req.body.description);
})
.put( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for /leaders');
})
.delete( (req, res, next) =>{
    res.end('Will delete the leaders for you');
});

leaderRouter.route('/:dishid')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.header = ('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('Will send the leaders for you');
})
.post( (req, res, next) =>{
    res.statusCode = 403
    res.end('This operation is not avaiable for leader id');
})
.put( (req, res, next) =>{
    res.end('Will update the leader ' + req.body.name +' with description: '+ req.body.description);
})
.delete( (req, res, next) =>{
    res.end('Will delete the leader for you');
});

module.exports = leaderRouter;


