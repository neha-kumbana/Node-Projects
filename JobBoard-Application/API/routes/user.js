const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profile'); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const { getUser, updatedUser } = require('../controllers/user')

router.route('/user/:id').get(getUser)
router.patch('/user/:id',upload.single('profile'),updatedUser)

module.exports = router