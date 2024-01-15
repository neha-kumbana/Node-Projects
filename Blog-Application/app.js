require("dotenv").config()
require("express-async-errors")
const bodyParser = require('body-parser')

const multer = require('multer')
const upload = multer();
const path = require('path');

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

const express = require("express")
const app = express()

const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blogs')
const publicBlogRouter = require('./routes/publicBlogs')

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended:true}));
//app.use(express.urlencoded({extended:true}))

//app.use(upload.array())
// app.use(express.json());

//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/blogs',authenticateUser,blogRouter)
app.use('/api/v1/blog/public',publicBlogRouter)

const formData = {
  title: 'Blog Title',
  category: 'Blog Category',
  visibility: 'public',
  content: 'Blog Content'
};

app.post('/test', (req, res) => {
const { title, category, visibility, content } = req.body;
console.log(req.body);
res.send('successful')
})


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server listening on port ${port}...`))
    }catch(error){
        console.log(error);
    } 
}
start()
