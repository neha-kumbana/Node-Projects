const Blog = require('../models/blogs')
const Comment = require('../models/comments')
const User = require('../models/registration')
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

const getAuthorName = async(req, res) => {
    try{
        const { id:blogId } = req.params
        const blog = await Blog.findById(blogId).populate('author')
        if(!blog || !blog.author){
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Blog or author not found' });
        }
        const username = blog.author.username
        // const authorName = author.map(blog => blog.author.userId)
        res.status(StatusCodes.OK).json(username)

    }catch(error){
        console.log('An error occured', error);
    }
}

const getComments = async(req, res) => {
    try{
        const {id:blogId} = req.params
        const comments = await Comment.find({
            blog:blogId,
        })
        if(!comments){
            throw new NotFoundError('Blog not found')
        }
        const totalLikes = comments.reduce((total, comment) => total + (comment.like || 0), 0);
        res.status(StatusCodes.OK).json({comments, totalLikes})
    }catch(error){
        console.log('An error occured', error);
    }
}

const getAuthorNameOfComment = async(req, res) => {
    const { id:commentId } = req.params
    const comment = await Comment.findById(commentId).populate('author')
    if(!comment || !comment.author){
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Comment or author not found' });
    }
    const username = comment.author.username
    res.status(StatusCodes.OK).json(username)
}


module.exports = {
    getPublicBlogs,
    getCategory,
    getComments,
    getAuthorName,
    getAuthorNameOfComment
}