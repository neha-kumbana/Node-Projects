const express = require('express')
const router = express.Router()
const multer = require('multer');
const upload = multer()
const { register, login, updatePassword } = require('../controllers/auth')

router.post('/register',upload.array(),register)
router.post('/login',upload.array(),login)
router.patch('/updatePassword',upload.array(),updatePassword)

module.exports = router
