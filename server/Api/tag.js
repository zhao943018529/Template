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
            });
        }
    });
});

router.post('/addTag', function (req, res, next) {
        let tag = new Tag(req.body);
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

router.get('/updateTag', function (req, res, next) {
    let query = req.query;
    if (query.id) {
        Tag.findOneAndUpdate({ _id: query.id },
            {
                name: query.name,
                description: query.description
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