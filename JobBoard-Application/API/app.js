require('dotenv').config()
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer()

const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
const userRouter = require('./routes/user')

const authenticateUser = require('./middleware/authenticated')

app.use(upload.array())
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/auth/',authRouter)
app.use('/api/v1/',authenticateUser,jobRouter)
app.use('/api/v1/profile/',authenticateUser,userRouter)


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