const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

const { createJob, getAllJobsEmployee, getJobDetails, getSearchJob, getAllJobs, getJob, updateJob, deleteJob } = require('../controllers/jobs')

router.post('/employeeJobs',upload.array(),createJob)
router.route('/employeeJobs').get(getAllJobsEmployee)
router.route('/employeeJobs/:id').get(getJob).delete(deleteJob)
router.patch('/employeeJobs/:id',upload.array(),updateJob)
router.route('/jobs').get(getAllJobs)
router.route('/jobs/search').get(getSearchJob)
router.route('/jobs/:id').get(getJobDetails)

module.exports = router