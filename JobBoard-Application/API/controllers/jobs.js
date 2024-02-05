const { NotFoundError } = require('../error')
const Job = require('../models/job')
const {StatusCodes} = require('http-status-codes')

const createJob = async (req, res) => {
    try{
        req.body.employer = req.user.userId
        const job = await Job.create({...req.body})
        res.status(StatusCodes.CREATED).json({job})
    }catch(error){
        console.log('An error occured', error);
    } 
}

const getAllJobs = async (req, res) => {
    try{
        const job = await Job.find({employer:req.user.userId}).sort('created')
        res.status(StatusCodes.OK).json({job})
    }catch(error){
        console.log('An error occured', error);
    }
}

const getJob = async (req, res, next) => {
    try{
        const {user:{userId},params:{id:jobId}} = req
        const job = await Job.findOne({
            _id:jobId,
            employer:userId
        })
        if(!job){
            throw new NotFoundError('Job not found')
        }
        res.status(StatusCodes.OK).json({job})
    }catch(error){
        next(error)
    }
}

const updateJob = async (req, res, next) => {
    try{
        const {user:{userId}, params:{id:jobId}} = req
        const job = await Job.findOneAndUpdate({
            _id:jobId,
            employer:userId
        },req.body,{
            new:true,
            runValidators:true
        })
        if(!job){
            throw new NotFoundError('Job not found')
        }
        res.status(StatusCodes.OK).json({job})
    }catch(error){
        next(error)
    }
}

const deleteJob = async (req, res, next) => {
    try{
        const {user:{userId},params:{id:jobId}} = req
        const job = await Job.findOneAndDelete({
            _id:jobId,
            employer:userId
        })
        if(!job){
            throw new NotFoundError('Job not found')
        }
        res.status(StatusCodes.OK).json({job})
    }catch(error){
        next(error)
    }
    
}

module.exports = {
    createJob,
    getAllJobs,
    getJob,
    updateJob,
    deleteJob
}