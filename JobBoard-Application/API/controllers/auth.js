const { UnauthenticatedError, BadRequestError, NotFoundError } = require('../error')
const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')

const register = async(req, res) => {
    try{
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user:{name:user.username},token})
    }catch(error){
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        console.error('An error occured', error);
    }

}

const updatePassword = async (req, res, next) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            throw new BadRequestError('Please provide email and password')
        }
        const user = await User.findOne({email})
        if(!user){
            throw new UnauthenticatedError('Invalid credentials')
        }
        user.password = password
        const updatedUser = await user.save()
        const token = updatedUser.createJWT()
        res.status(StatusCodes.OK).json({user:{username:user.username},token})

    }catch(error){
        next(error)
    }
}



const login = async(req, res, next) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            throw new BadRequestError('Please provide email and password')
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
        res.status(StatusCodes.OK).json({user:{username:user.username},token})
    }catch(error){
        next(error)
    }
    
}

module.exports = {
    register,
    login,
    updatePassword
}