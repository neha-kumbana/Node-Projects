const { timeStamp } = require('console');
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');

const ApplicationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'please provide userId']
    },
    education:{
        type: String,
        require: [true, 'please provide education']
    },
    experience:{
        type: String,
        require: [true, 'please provide experience']
    },
    skills:{
        type: String,
        require: [true, 'please provide skills']
    },
    resume:{
        type: String,
        require: [true, 'please provide resume']
    },
    contactDetails:{
        type: String,
        require: [true, 'please provide contactDetails']
    },
    job:{
        type: mongoose.Types.ObjectId,
        ref: 'Jobs',
        require: [true, 'please provide jobId']
    }
},{timestamps:true})

module.exports = mongoose.model('Application', ApplicationSchema)
