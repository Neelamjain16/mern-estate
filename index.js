const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const dotenv=require('dotenv')
dotenv.config();
const authRouter=require("./routes/auth.route.js")
const userRouter=require('./routes/user.route.js')
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to db')
})
.catch((err)=>{
     console.log(err)
})

app.use(express.json())
app.listen(3001,()=>{
    console.log('Server is running on port 3001 !!!')
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

