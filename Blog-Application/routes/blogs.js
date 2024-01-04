const express = require('express')
const router = express.Router()

const {getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog} = require('../controllers/blogs')

router.route('/').post(createBlog).get(getAllBlogs)
router.route('/:id').get(getBlog).patch(updateBlog).delete(deleteBlog)

module.exports = router