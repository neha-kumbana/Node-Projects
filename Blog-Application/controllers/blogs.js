const Blog = require('../models/blogs')
const Comment = require('../models/comments')
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


// const createComment = async (req, res) => {
//     try{
//         const {blogId, comment, like} = req.body
//         const userId = req.user.userId
        
//         const comments = await Comment.create({
//             comment,
//             like,
//             blog:blogId,
//             author:userId
//         })
//         res.status(StatusCodes.OK).json({comment: comments})

//     }catch(error){
//         console.log('An error occurd', error);
//     }
// }


const createComment = async (req, res) => {
    try {
        const { blogId, comment, like } = req.body;
        const userId = req.user.userId;

        // Check if the user has provided a like in the request
        if (like !== undefined) {
            // Check if the user has previously liked the blog
            let existingLike = await Comment.findOne({ blog: blogId, author: userId });

            if (existingLike) {
                // User has previously liked the blog, toggle the existing like
                existingLike.like = !existingLike.like;
                await existingLike.save();

                // Get the total number of likes that are true
                const totalLikes = await Comment.countDocuments({ blog: blogId, like: true });

                res.status(StatusCodes.OK).json({ comment: existingLike, totalLikes });
                return; // Return to avoid sending another response
            } else {
                // User has not previously liked the blog, create a new like
                existingLike = await Comment.create({
                    like,
                    blog: blogId,
                    author: userId
                });

                // Get the total number of likes that are true
                const totalLikes = await Comment.countDocuments({ blog: blogId, like: true });

                res.status(StatusCodes.OK).json({ comment: existingLike, totalLikes });
                return; // Return to avoid sending another response
            }
        }

        // Check if the user has provided a comment
        if (comment !== undefined) {
            const newComment = await Comment.create({
                comment,
                blog: blogId,
                author: userId
            });

            // Get the total number of likes that are true
            const totalLikes = await Comment.countDocuments({ blog: blogId, like: true });

            res.status(StatusCodes.OK).json({ comment: newComment, totalLikes });
            return; // Return to avoid sending another response
        }

        // If neither like nor comment is provided in the request, handle it accordingly
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid request' });
    } catch (error) {
        console.log('An error occurred', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};



const getAllComment = async(req, res) => {
    const blogs = await Comment.find({author:req.user.userId})
    // const totalLikes = await Comment.countDocuments({ blog: blogId, like: true });
    res.status(StatusCodes.OK).json({ blogs})
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
    createComment,
    getAllComment,
    createBlog,
    updateBlog,
    deleteBlog
}