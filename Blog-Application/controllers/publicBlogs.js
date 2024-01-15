const Blog = require('../models/blogs')
const {StatusCodes} = require('http-status-codes')
// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');
const {BadRequestError, NotFoundError} = require('../error')

const getPublicBlogs = async(req, res) => {
    try{
        const publicBlogs = await Blog.find({ visibility: 'public' });
        res.status(StatusCodes.OK).json({ publicBlogs })
    }catch(error){
        console.log('An error occured', error);
    }
    
}

const getCategory = async(req, res) => {
    try{
        const {category} = req.params
        const publicBlogs = await Blog.find({ category:category })
        res.status(StatusCodes.OK).json({ publicBlogs })
    }catch(error){
        console.log('An error occured', error);
    }
}

module.exports = {
    getPublicBlogs,
    getCategory
}