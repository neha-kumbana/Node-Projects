const jwt = require('jsonwebtoken')
const {CustomAPIError} = require('../error/custom-api')
const User = require('../models/registration')
const {BadRequestError, UnauthenticatedError} = require('../error')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {
    try{
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user:{name:user.username},token})
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}

const login = async (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        throw new BadRequestError("Please provide email an password");
    }
    const user = await User.findOne({username})

    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:username}, token})
    
}

module.exports = {
    register,
    login
}