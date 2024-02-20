const User = require('../models/user')
const { NotFoundError } = require('../error')
const { StatusCodes } = require('http-status-codes')

const getUser = async (req, res, next) => {
    try{
        const {params:{id:userId}} = req
        const user = await User.findOne({
            _id:userId
        })
        if(!user){
            throw new NotFoundError('No user found')
        }
        res.status(StatusCodes.OK).json({ user })
    }catch(error){
        next(error)
    } 
}

const updatedUser = async (req, res, next) => {
    try{
        const {params:{id:userId}} = req
        const profile = req.file
        const profilePath = profile.path
        const user = await User.findOneAndUpdate({
            _id:userId
        }, {
            ...req.body, 
            profile: profilePath 
        },{
            new:true,
            runValidators:true
        })
        if(!user){
            throw new NotFoundError('No user found')
        }
        res.status(StatusCodes.OK).json({user})
        }catch(error){
            next(error)
        }
    
}

module.exports = {
    getUser,
    updatedUser
}