const { NotFoundError } = require('../error')
const Saved = require('../models/savedJobs')
const { StatusCodes } = require('http-status-codes')

const createSavedJob = async (req, res) => {
    const save = await Saved.create({...req.body})
    res.status(StatusCodes.CREATED).json({save})
}

const getSavedJobs = async (req, res) => {
    const saves = await Saved.find()
    res.status(StatusCodes.OK).json({saves})
}

const deleteSavedJobs = async (req, res, next) => {
    try{
        const {params:{id:saveId}} = req
        const save = await Saved.findOneAndDelete({
            _id:saveId
        })
        if(!save){
            throw new NotFoundError('No Job found')
        }
        res.status(StatusCodes.OK).json({save})
    }catch(error){
        next(error)
    }
}

module.exports = {
    createSavedJob,
    getSavedJobs,
    deleteSavedJobs
}