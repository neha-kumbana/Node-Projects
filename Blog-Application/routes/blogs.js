const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload');

const {getAllBlogs, getBlog, createComment, getAllComment, createBlog, updateBlog, deleteBlog} = require('../controllers/blogs')

// router.post('/', upload.single('image'), createBlog);
router.route('/').post(createBlog).get(getAllBlogs)
router.route('/comments').post(createComment).get(getAllComment)
// router.route('/comments/:id').get(getComments)
// router.post('/',upload.single("image"), createBlog)
// router.route('/').get(getAllBlogs)
router.route('/:id').get(getBlog).patch(updateBlog).delete(deleteBlog)


module.exports = router