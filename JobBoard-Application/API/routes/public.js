const express = require('express')
const router = express.Router()
const { getPublicJobs } = require('../controllers/public')

router.route('/publicJobs').get(getPublicJobs)

module.exports = router
