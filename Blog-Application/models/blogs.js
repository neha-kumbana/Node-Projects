const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, 'please provide the title'],
    },
    content: {
        type: String,
        required:[true, 'please write the content']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'please provide the author name']
    },
    visibility: {
        type: String,
        enum:['private','public']
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required:[true, 'please provide the category']
    }
},{timestamps:true})

module.exports = mongoose.model('Blog', BlogSchema)
