const express= require('express');
const app = express();
const mongoose= require('mongoose');
const dotenv=require("dotenv").config();
const connectDB=require('./config/connectDB')
const PORT = process.env.PORT || 5000;
const Task=require('./model/taskModel');
const taskRoutes= require('./routes/taskRoute')
const cors=require('cors')

//---------------middlewares---------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//for form data
app.use(cors());
app.use("/api/v1/tasks",taskRoutes)
//---------------------------------

app.get('/',(req,res)=>{
    res.send("HomePage");
})
//--------------------------------
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server running on ${PORT}`);
    })
    })
    .catch((err)=>{
        console.log(err);
    })


//ROUGH SNIPPETS-------------------------------------
        // const logger=(req,res,next)=>{
        //     console.log("Middleware Chalte boi");
        //     console.log(req.method);
        //     next();
        // }