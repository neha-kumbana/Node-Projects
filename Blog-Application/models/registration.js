const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const RegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true,'must provide a username'],        
        trim:true,
        unique:true,
        minlength:3,
        maxlength:20
    },
    email: {
        type: String,
        required:[true, 'must provide a email'],
        trim:true,
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
    },
    fullName: {
        type: String,
        required:[true, 'must provide a full name'],
        trim:true,
        minlength:3,
        maxlength:20
    },
    bio: {
        type: String,
        required: [true, 'must provide a bio']
    },
    socialMediaLinks: {
        type: String,
    },
    password: {
        type: String,
        required:[true, 'must provide a password'],
        minlength:6,
    },
})

RegistrationSchema.pre(['save','updateOne', 'update'], async function(next){
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

RegistrationSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id, name:this.username}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_LIFETIME,
    })
}

RegistrationSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User',RegistrationSchema)