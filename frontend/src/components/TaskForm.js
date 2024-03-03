import React from "react";

export const TaskForm = ({
  createTask,
  name,
  handleInputChange,
  isEditing,
  updateTask,
}) => {
  return (
    <form action="" className="task-form" onSubmit={isEditing? updateTask: createTask}>
      <input
        type="text"
        placeholder="Add a task"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit">{isEditing ? "Edit" : "Add"}</button>
    </form>
  );
};
