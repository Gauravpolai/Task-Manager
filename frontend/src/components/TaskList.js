import React, { useEffect, useState } from "react";
import { TaskForm } from "./TaskForm";
import Task from "./Task";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { URL } from "../App";
// import { useEffect } from 'react';
import loadingImage from "../assets/loader.gif";
export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
    bro: "helluw",
  });
  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/v1/tasks`);
      setTasks(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  //server= http://localhost:5000/api/v1/tasks
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.post(`${URL}/api/v1/tasks`, formData);
      toast.success("Task added successfully");
      setFormData({ ...formData, [name]: "" });
        getTasks();
    } catch (error) {
      toast.error(error.message);
    }
    console.log(formData);
  };
  const deleteTask = async (id) => {
    try {
      axios.delete(`${URL}/api/v1/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  };
  const updateTask = async (e) => {
    e.preventDefault();
    if(name===""){
        return toast.error("Input field cannot be empty");
    }
    else{
        try {
            await axios.put(`${URL}/api/v1/tasks/${taskId}`,formData);
            setFormData({...formData, name:""})
            setIsEditing(false);
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    }
  }
  const setToComplete=async(task)=>{
    const newFormData={
        name:task.name,
        completed:true
    }
    try {
        await axios.put(`${URL}/api/v1/tasks/${task._id}`, newFormData);
        getTasks();
    } catch (error) {
        toast.error(error.message);
    }
  }
  useEffect(()=>{
    const cTask=tasks.filter((task)=> task.completed === true)
    setCompletedTasks(cTask);
  },[tasks])
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks:</b>{tasks.length}
        </p>
        <p>
          <b>Completed Tasks:</b>{completedTask.length}
        </p>
      </div>
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImage} alt="Loadinf" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No Task Added. Please add task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                name={task.name}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
