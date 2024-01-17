const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
        required:[true, 'Please provide blog name']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'Please provide author name']
    },
    comment: {
        type: String,
    },
    like: {
        type: Boolean
    }
}, {timestamps:true})

module.exports = mongoose.model('Comments',CommentsSchema)