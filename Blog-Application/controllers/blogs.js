const Blog = require('../models/blogs')
const {StatusCodes} = require('http-status-codes')
// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');
const {BadRequestError, NotFoundError} = require('../error')

//all the blogs associated with the user
const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({author:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ blogs })
}

const getBlog = async (req, res) => {
    const {user:{userId},params:{id:blogId}} = req
    const blog = await Blog.findOne({
        _id:blogId,
        author:userId
    })
    if(!blog){
        throw new NotFoundError('No blog found')
    }
    res.status(StatusCodes.OK).json({ blog })
}

const createBlog = async (req, res) => {
    try{
        const { title, content, category, visibility } = req.body;
        req.body.author = req.user.userId
        const blog = await Blog.create({...req.body})
        // Sending the response with the created blog entry
        res.status(StatusCodes.CREATED).json({ blog });
    }catch(error){
        console.error('An error occured', error);
    }
    // req.body.author = req.user.userId
    // const blog = await Blog.create(req.body)
    // res.status(StatusCodes.CREATED).json({ blog })
}

const updateBlog = async (req, res) => {
    const {user:{userId},params:{id:blogId}} = req
    const blog = await Blog.findOneAndUpdate({
        _id:blogId,
        author:userId,
    }, req.body,{
        new:true,
        runValidators:true,})
    if(!blog){
        throw new NotFoundError('No blog found')
    }
    res.status(StatusCodes.OK).json({ blog })
}

const deleteBlog = async (req, res) => {
    const {user:{userId},params:{id:blogId}} = req
    const blog = await Blog.findOneAndDelete({
        _id:blogId,
        author:userId
    })
    if(!blog){
        throw new NotFoundError('No blog found')
    }
    res.status(StatusCodes.OK).json({ blog })
}

module.exports = {
    getAllBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}