const express = require('express')
const router = express.Router()

const { createJob, getAllJobs, getJob, updateJob, deleteJob } = require('../controllers/jobs')

router.route('/jobs').post(createJob).get(getAllJobs)
router.route('/jobs/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router