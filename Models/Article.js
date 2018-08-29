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
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
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
    }).exec(cb);
}

ArticleSchema.statics.getArticlesByTags = function (tids, cb) {
    return this.find({ tags: { $in: tids } }).select('_id title author tags').populate({
        path: 'author',
        select: '_id nickname',
    }).populate({
        path: 'tags',
        select: '_id name',
    }).exec(cb);
}
//.select('_id title author tags')
module.exports = mongoose.model('Article', ArticleSchema);