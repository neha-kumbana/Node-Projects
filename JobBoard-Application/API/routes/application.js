const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path')
const { createApplication, getAllApplication, getApplications } = require('../controllers/application')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resumes'); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post('/',upload.single("resume"),createApplication)
router.route('/').get(getAllApplication)
router.route('/jobID').get(getApplications)

module.exports = router
