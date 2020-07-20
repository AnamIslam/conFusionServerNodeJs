const express = require('express');
const bodyparser = require('body-parser');
const multer = require('multer');
const cors = require('./cors');
const authenticate = require('../authenticate');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images');
    },

    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    } 
})

const imageFilter = (req, file, cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
    {
        return cb(new Error('You can only upload image file'), false);
    }
    cb(null, true);
}

const upload = multer({ storage: storage, imageFilter: imageFilter});

const uploadRouter = express.Router();
uploadRouter.use(bodyparser.json());

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for /imagesUpload');
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for /imagesUpload');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) =>{
    res.statusCode = 403;
    res.end('This operation is not avaiable for /imagesUpload');
})

module.exports = uploadRouter;