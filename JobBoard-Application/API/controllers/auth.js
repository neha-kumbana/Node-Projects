const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')

const register = async(req, res) => {
    try{
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user:{name:user.username},token})
    }catch(error){
        console.error('An error occured', error);
    }

}

module.exports = {
    register
}