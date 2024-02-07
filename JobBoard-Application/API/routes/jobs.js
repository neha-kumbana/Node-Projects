const express = require('express')
const router = express.Router()

const { createJob, getAllJobsEmployee, getJobDetails, getAllJobs, getJob, updateJob, deleteJob } = require('../controllers/jobs')

router.route('/employeeJobs').post(createJob).get(getAllJobsEmployee)
router.route('/employeeJobs/:id').get(getJob).patch(updateJob).delete(deleteJob)
router.route('/jobs').get(getAllJobs)
router.route('/jobs/:id').get(getJobDetails)

module.exports = router