const express = require('express');
const router = express.Router();
const Tag = require('../../Models/Tag');

router.get('/getTags', function (req, res, next) {
    Tag.find({}).exec(function (err, tags) {
        if (err) {
            next(err);
        } else {
            res.json({
                status: 200,
                data: tags,
                message:'Obtain tags successfully',
            });
        }
    });
});

router.post('/addTag', function (req, res, next) {
    let body = req.body;
    console.log(body);
    let tag = new Tag({
        name: body.name,
        description: body.description,
    });
    tag.save(function (err, doc) {
        if (err) {
            next(err);
        } else {
            let result = {
                status: 200,
                message: "add tag successfully",
            };
            res.json(result);
        }
    });
});

router.get('/delTag', function (req, res, next) {
    let id = req.query.id;
    if(id){
        Tag.findByIdAndDelete(id).exec(function (err, tags) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    message:'delete tag successfully',
                });
            }
        });
    }else{
        let err= new Error('delete tag need pass id');
        next(err);
    }
});

router.post('/updateTag', function (req, res, next) {
    let body = req.body;
    if (body.id) {
        Tag.findOneAndUpdate({ _id: body.id },
            {
                name: body.name,
                description: body.description
            }, { new: true }).exec(function (err, tag) {
                if (err) {
                    next(err);
                } else {
                    res.json({
                        status: 200,
                        data: tag,
                        message: 'update tag successfully',
                    });
                }
            });
    } else {
        let err = new Error('update tag need pass id');
        next(err);
    }
});

module.exports = router;