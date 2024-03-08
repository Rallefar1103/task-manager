import React, { useState } from "react";
import { useCreateTask } from "../service/taskManager";
import "./taskForm.css";

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const { createTask, isLoading, error } = useCreateTask();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!taskTitle) return;

    const newTask = await createTask({ title: taskTitle, completed: false });
    if (newTask && !error) {
      setTaskTitle("");
      onTaskCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        className="task-input"
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
        required
      />
      {isLoading ? (
        <div>Submitting ...</div>
      ) : (
        <button type="submit" className="submit-btn">
          Add Task
        </button>
      )}
      {error && <div>Error while creating task: {error.message}</div>}
    </form>
  );
};

export default TaskForm;
