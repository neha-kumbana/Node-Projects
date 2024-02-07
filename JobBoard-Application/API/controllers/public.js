const Job = require('../models/job')
const { StatusCodes } = require('http-status-codes')

const getPublicJobs = async (req, res) => {
    try{
        const jobs = await Job.find({visibility:'public'})
        res.status(StatusCodes.OK).json({jobs})
    }catch(error){
        console.log('An error occured', error);
    }
    
}

module.exports = {
    getPublicJobs
}
