const { NotFoundError } = require('../error')
const Job = require('../models/job')
const {StatusCodes} = require('http-status-codes')

const createJob = async (req, res) => {
    try{
        if (req.user.role !== 'Employer') {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Only employers can create jobs.' });
        }
        
        req.body.employer = req.user.userId
        const job = await Job.create({...req.body})
        res.status(StatusCodes.CREATED).json({job})
    }catch(error){
        console.log('An error occured', error);
    } 
}

const getAllJobsEmployee = async (req, res) => {
    try{
        const jobs = await Job.find({employer:req.user.userId}).sort('created')
        res.status(StatusCodes.OK).json({jobs})
    }catch(error){
        console.log('An error occured', error);
    }
}

const getAllJobs = async (req, res) => {
    try{
        const jobs = await Job.find()
        res.status(StatusCodes.OK).json({jobs})
    }catch(error){
        console.log('An error occured', error);
    }
}

const getJobDetails = async (req, res, next) => {
    try{
        const {params:{id:jobId}} = req
        const job = await Job.findOne({
            _id: jobId
        })
        if(!job) {
            throw new NotFoundError('No job found')
        }
        res.status(StatusCodes.OK).json({job})
    }catch(error){
        next(error)
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
    getAllJobsEmployee,
    getAllJobs,
    getJobDetails,
    getJob,
    updateJob,
    deleteJob
}