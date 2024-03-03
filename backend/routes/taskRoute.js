const express= require('express');
const Task=require('../model/taskModel');
const router= express.Router();
const {createTask,getAllData,getTask, deleteTask,updateTask}=require('../controllers/taskController')




//Create a Task
router.post('/', createTask);
//Get all Tasks
router.get('/', getAllData);
//Get a Task
router.get('/:id', getTask);
//Delete a Task
router.delete('/:id', deleteTask);
//update a Task
router.put('/:id', updateTask);

//alternative
// router.route("/").get(getAllData).post(createTask);


module.exports=router;