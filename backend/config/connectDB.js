const mongoose =require('mongoose');

const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoRunning");
    }catch(err){
        console.log("here");
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectDB;


//alternative
// const startServer= async()=>{
//     try {
//         await connectDB();
//         app.listen(PORT, ()=>{
//             console.log(`Server running on ${PORT}`);
//         })
//     } catch (error) {
//         console.log(err);
//     }
// }
// startServer();

//model refers to the logical struture of the database and how the data will be stored
//schema defines how the data is organized