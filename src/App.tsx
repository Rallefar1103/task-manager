import { useCallback, useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/taskForm";
import { useFetchTasks } from "./service/taskManager";

function App() {
  const { fetchTasks, tasks, isLoading } = useFetchTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskCreated = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <section id="task-manager">
      <h1 className="header-title"> Task Manager </h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : (
        <div className="task-list">
          {tasks.length === 0 ? (
            <div>You don't have any tasks yet!</div>
          ) : (
            tasks.map((task, index) => (
              <div key={index}>
                {task.title} - {task.completed ? "Completed" : "Not Completed"}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default App;
