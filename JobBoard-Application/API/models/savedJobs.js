const mongoose = require('mongoose')

const SavedSchema = new mongoose.Schema({
    job:{
        type: mongoose.Types.ObjectId,
        ref: 'Job',
        require:[true, 'please provide job id']
    },
    title:{
        type: String,
        require: [true, 'please provide title']
    },
    rolesAndResponsibilities:{
        type: String,
        require: [true, 'please provide rolesAndResponsibilities']
    },
    skills: {
        type: String,
        require: [true, 'please provide skills']
    },
    location: {
        type: String,
        require: [true, 'please provide location']
    },
    company: {
        type: String,
        require: [true, 'please provide company']
    }
})

module.exports = mongoose.model('Saved', SavedSchema)
