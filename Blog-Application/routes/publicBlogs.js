const express = require('express')
const router = express.Router()

const { getPublicBlogs, getCategory, getAuthorName, getAuthorNameOfComment, getComments} = require('../controllers/publicBlogs')

router.route('/blogs').get(getPublicBlogs)
router.route('/category/:category').get(getCategory)
router.route('/author/:id').get(getAuthorName)
router.route('/comment/:id').get(getAuthorNameOfComment)
router.route('/comments/:id').get(getComments)

module.exports = router
