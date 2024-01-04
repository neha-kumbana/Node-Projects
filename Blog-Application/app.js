require("dotenv").config()
require("express-async-errors")
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

const express = require("express")
const app = express()

const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blogs')
app.use(express.json())

//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/blogs',authenticateUser,blogRouter)

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
