import axios from "axios";
import { useState, useCallback } from "react";

const baseURL: string = "http://localhost:5000/api/tasks ";

interface Task {
  id?: string;
  title: string;
  completed: boolean;
}

export const useCreateTask = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createTask = async (taskData: Task) => {
    setIsLoading(true);

    try {
      const response = await axios.post<Task>(baseURL, taskData);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
    }
  };

  return { createTask, isLoading, error };
};

export const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(baseURL);
      setIsLoading(false);
      setTasks(response.data);
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
    }
  }, []);

  return { fetchTasks, isLoading, error, tasks };
};

export const useDeleteTask = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteTask = async (taskId: string) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`${baseURL}/${taskId}`);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
    }
  };

  return { deleteTask, isLoading, error };
};

export const useUpdateTask = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateTask = async (taskId: string, taskData: Task) => {
    setIsLoading(true);

    try {
      const response = await axios.put(`${baseURL}/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError(error as Error);
    }
  };

  return { updateTask, isLoading, error };
};
