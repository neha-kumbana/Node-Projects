const express = require('express')
const router = express.Router()

const { getPublicBlogs, getCategory } = require('../controllers/publicBlogs')

router.route('/blogs').get(getPublicBlogs)
router.route('/category/:category').get(getCategory)

module.exports = router
