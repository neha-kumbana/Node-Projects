const express = require('express')
const router = express.Router()

const {login, register, updatePassword, profile, updateProfile} = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updatePassword').post(updatePassword)
router.route('/user/:id').get(profile).patch(updateProfile)

module.exports = router