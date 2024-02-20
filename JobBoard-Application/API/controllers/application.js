const { StatusCodes } = require('http-status-codes')
const Application = require('../models/application')
const {NotFoundError} = require('../error');
const { query } = require('express');

const createApplication = async(req, res) => {
    try{
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'No file uploaded' });
        }
        if (req.user.role !== 'Job Seeker') {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Only job seeker can apply for jobs.' });
        }
        req.body.user = req.user.userId
        const resumeFile = req.file; 
        const resumePath = resumeFile.path; 
        const resumeOriginalName = resumeFile.originalname;
        const app = await Application.create({
            ...req.body,
            resume: resumePath,
            
        })
        res.status(StatusCodes.CREATED).json({app})
    }catch(error){
        console.log('An error occured while applying:', error);
    }
}

const getAllApplication = async(req, res) => {
    try{
        const apps = await Application.find()
        res.status(StatusCodes.OK).json({apps})
    }catch(error){
        console.log('An error occured while fetching application', error);
    }
}

const getApplications = async(req, res, next) => {
    try {
        const { job } = req.query
        let query = {}
        query.job = job
        // console.log(req.params.jobId);
        const apps = await Application.find(query).populate('user', 'username email')
        if (!apps || apps.length === 0) {
            throw new NotFoundError('No applications found');
        }
        res.status(StatusCodes.OK).json({ apps });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createApplication,
    getAllApplication,
    getApplications
}