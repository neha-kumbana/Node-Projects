const express = require('express')
const router = express.Router()

const { getUser, updatedUser } = require('../controllers/user')

router.route('/user/:id').get(getUser).patch(updatedUser)

module.exports = router