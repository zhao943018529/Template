const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Schema.Types.ObjectId;
const Article = require('../../Models/Article');
const _ = require('lodash');


router.post('/add', function (req, res, next) {
    if (req.user) {
        console.log(req.user);
        let content = {
            author: req.user.id,
            title: req.body.title,
            tags: req.body.tags,
            content: JSON.stringify(req.body.content),
        };
        let article = new Article(content);
        article.save(function (err, doc) {
            if (err) {
                if (err.errors) {
                    res.json({
                        status: 300,
                        data: err.errors,
                        message: 'validate failed',
                    });
                } else {
                    next(err);
                }
            } else {
                res.json({
                    status: 200,
                    message: 'post article successfully',
                });
            }
        });
    } else {
        res.status(400).send('Login Invalid');
    }
});


router.get('/get/:uid',function(req,res,next){
    let uid = req.params.uid;
    Article.getArticlesByUid(uid,function(err,article){

    });

});

module.exports = router;