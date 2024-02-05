const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'must provide username'],
        unique: true
      },
      email: {
        type: String,
        required: [true, 'must provide email id'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
      },
      password: {
        type: String,
        required: [true, 'must provide password'],
        minlength: 6
      },
      role: {
        type: String,
        enum: ['Job Seeker', 'Employer'],
        required: true
      },
        education: {
          type: String
        },
        experience: {
          type: String
        },
        skills: {
          type: String,
        },
        resume: {
          type: String, 
        },
        contactDetails: {
          type: String
        },
        companyName: {
          type: String,
        },
        location: {
          type: String,
        },
        industry: {
          type: String,
        },
        website: {
          type: String,
        },
    });

    UserSchema.pre(['save', 'updateOne', 'update'], async function (next) {
        if (!this.isModified('password') || !this.password) {
          return next();
        }
        try {
          const salt = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password, salt);
          return next();
        } catch (error) {
          return next(error);
        }
      });

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id, name:this.username}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_LIFETIME,
    })
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}
    
    
module.exports = mongoose.model('User', UserSchema);