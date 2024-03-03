const Task=require('../model/taskModel')
//---------create a new task----------
const createTask= async(req,res)=>{
    try {
        const task= await Task.create(
            req.body
        )
        res.json(task)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//------------get all tasks------------
const getAllData= async (req, res) => {
    try {
        const task= await Task.find();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

//--------------get a task-------------
const getTask=async(req,res)=>{
    try {
        console.log(req.params); 
        const {id}=req.params;
        const task=await Task.findById(id);
        if(!task){
            return res.status(404).json({msg: "No task found"})
        }
        res.status(200).json(task);    
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//--------delete a task----------
const deleteTask= async(req,res)=>{
    try {
        const {id}=req.params;
        const task=await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({msg: "No task found"})
        }
        res.status(200).send(`The Task with id ${id} Deleted`);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

//---------Update Task----------
const updateTask =async(req, res)=>{
    try {
        const {id}=req.params;
        const task= await Task.findByIdAndUpdate(
            {_id: id},
            req.body,
            {new: true, runValidators: true}
        )
        if(!task){
            return res.status(404).send("No task with the id");
        }
        res.status(200).json({task}); 
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}
//use patch for updating single fields.
module.exports={
    createTask,
    getAllData,
    getTask,
    deleteTask,
    updateTask
};