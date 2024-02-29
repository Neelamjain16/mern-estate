const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const dotenv=require('dotenv')
dotenv.config();
const authRouter=require("./routes/auth.route.js")
const userRouter=require('./routes/user.route.js')
const listingRouter=require('./routes/listingRouter.route.js')
const cookieParser=require('cookie-parser')
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to db')
})
.catch((error)=>{
     console.log(error)
})

app.use(express.json())
app.use(cookieParser());
app.listen(3001,()=>{
    console.log('Server is running on port 3001 !!!')
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)
app.use((error,req,res,next)=>{
    const statusCode=error.statusCode || 500;
    const message=error.message ||'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})