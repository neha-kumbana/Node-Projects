const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const { createSavedJob, getSavedJobs, deleteSavedJobs } = require('../controllers/savedJob')

router.post('/',upload.array(),createSavedJob)
router.route('/').get(getSavedJobs)
router.route('/:id').delete(deleteSavedJobs)

module.exports = router