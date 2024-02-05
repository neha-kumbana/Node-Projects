require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer()

const authRouter = require('./routes/auth')

app.use(upload.array())
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/auth/',authRouter)

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