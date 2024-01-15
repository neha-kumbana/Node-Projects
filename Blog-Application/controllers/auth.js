const jwt = require('jsonwebtoken')
const {CustomAPIError} = require('../error/custom-api')
const User = require('../models/registration')
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../error')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {
    try{
        const {username, email, fullName, bio, socialMediaLinks, password} = req.body
        // const defaultSocialMediaLinks = socialMediaLinks || "enter any social media links";
        // req.body.socialMediaLinks = defaultSocialMediaLinks
        const user = await User.create({...req.body})
        // const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user:{name:user.username},token})
    }catch(error){
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            // Duplicate key error (email already exists)
            return res.status(400).json({ error: 'Email already exists' });
        }

        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updatePassword = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide email and new password");
    }
    try{
        const user = await User.findOne({email})

        if(!user){
            throw new UnauthenticatedError('Invalid email')
        }
        user.password = password
        const updatedUSer = await user.save()
        const token = updatedUSer.createJWT()
        res.status(StatusCodes.OK).json({user:{email:updatedUSer.email}, token})
    }catch(error){
        console.log('An error occured ', error);
    }
    
}

const profile = async (req, res) => {
    try{
        const { id: userId } = req.params
        const user = await User.findOne({ _id: userId })
        if (!user) {
           throw new NotFoundError('No user found')
        }

        res.status(StatusCodes.OK).json({ user })
    }catch(error){
        console.error(error);
    }   
}

const updateProfile = async (req, res) => {
    try{
        const { id:userId } = req.params
        const user = await User.findOneAndUpdate({
            _id:userId,
        },
        req.body,{
            new:true,
            runValidators:true,
        })
        if(!user){
            throw new NotFoundError('No user found')
        }
        res.status(StatusCodes.OK).json({ user })
    }catch(error){
        console.error('An error occured', error);
    }
}

const getUserId = async (req, res) => {
    try{
        const { username } = req.params
        const user = await User.findOne({username:username})
        
        if(!user){
            throw new NotFoundError('No user found')
        }
        res.status(StatusCodes.OK).json({ user })
    }catch(error){
        console.log('An error occured', error);
    }
}


const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({email})

    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{username:user.username}, token})
    
}

module.exports = {
    register,
    login,
    updatePassword,
    profile,
    updateProfile,
    getUserId
}