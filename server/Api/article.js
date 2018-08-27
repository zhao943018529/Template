const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Schema.Types.ObjectId;
const Article = require('../../Models/Article');
const _ = require('lodash');


router.post('/addOrUpdate', function (req, res, next) {
    if (req.user) {
        let content = {
            title: req.body.title,
            tags: req.body.tags,
            content: JSON.stringify(req.body.content),
        };
        if (req.body.id) {
            content.updatedAt = Date.now();
            Article.findByIdAndUpdate(req.body.id, content, function (err) {
                if (err) {
                    next(err);
                } else {
                    res.json({
                        status: 200,
                        message: 'update article successfully',
                    });
                }
            });
        } else {
            content.author = req.user.id;
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
        }
    } else {
        res.status(400).send('Login Invalid');
    }
});

router.get('/get/:uid', function (req, res, next) {
    let uid = req.params.uid;
    Article.getArticlesByUid(uid, function (err, articles) {
        if (err) {
            next(err);
        } else {
            res.json({
                status: 200,
                data: articles,
                message: 'get article successfully',
            });
        }
    });
});

router.get('/getArticle/:id', function (req, res, next) {
    let id = req.params.id;
    if (id) {
        Article.findById(id, function (err, article) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: 200,
                    data: article,
                    message: 'fetch article successfully',
                });
            }
        });
    } else {
        res.status(400).send('please pass parameter id');
    }

});

module.exports = router;