require('dotenv').config()
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const express = require('express')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: 'http://localhost:4200',
  };

app.use(cors(corsOptions))

const publicRouter = require('./routes/public')
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')
const userRouter = require('./routes/user')
const appRouter = require('./routes/application')
const saveRouter = require('./routes/savedJobs')

const authenticateUser = require('./middleware/authenticated')


app.use('/resumes',express.static('resumes'));
app.use('/profile', express.static('profile'))
// app.use(upload.array())
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/v1/public/',publicRouter)
app.use('/api/v1/auth/',authRouter)
app.use('/api/v1/',authenticateUser,jobRouter)
app.use('/api/v1/profile/',authenticateUser,userRouter)
app.use('/api/v1/application/',authenticateUser,appRouter)
app.use('/api/v1/save', authenticateUser,saveRouter)

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
