const express = require('express')
const router = express.Router()
const { register, login, updatePassword } = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updatePassword').patch(updatePassword)

module.exports = router
