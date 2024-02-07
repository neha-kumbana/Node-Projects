const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        require: [true, 'Please provide job title']
    },
    employer:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require: [true, 'Please provide employer']
    },
    rolesAndResponsibilities:{
        type:String,
        require: [true, 'Please provide roles and responsibilities']
    },
    skills: {
        type:String,
        require: [true, 'Please provide skills']
    },
    location: {
        type: String,
        require: [true, 'Please provide location']
    },
    visibility:{
        type: String,
        default: 'public'
    }
},{timestamps: true})

module.exports = mongoose.model('Jobs', JobSchema)