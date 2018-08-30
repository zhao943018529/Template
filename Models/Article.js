const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Tag',
    }],
    content: {
        type: String,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

ArticleSchema.virtual("id").get(function () {
    return this._id;
});

ArticleSchema.set("toJSON", { virtuals: true });

ArticleSchema.statics.getArticlesByUid = function (uid, cb) {
    return this.find({ author: uid }).select('_id title author tags').populate({
        path: 'author',
        select: '_id nickname',
    }).populate({
        path: 'tags',
        select: '_id name',
    }).sort('updatedAt').exec(cb);
}

ArticleSchema.statics.findArticleDetailById = function (id, cb) {
    return this.findById(id).populate({
        path: 'author',
        select: '_id nickname username',
    }).populate('comments').populate({
        path: 'tags',
        select: '_id name',
    }).exec(cb);
}

ArticleSchema.statics.getArticlesByTags = function (tids, cb) {
    let query;
    if (!tids || !tids.length) {
        query = this.find({});
    } else {
        query = this.find({ tags: { $in: tids } });
    }
    return query.select('_id title author tags').populate({
        path: 'author',
        select: '_id nickname',
    }).populate({
        path: 'tags',
        select: '_id name',
    }).exec(cb);
}
//.select('_id title author tags')
module.exports = mongoose.model('Article', ArticleSchema);