"use client";

import { useEffect, useState } from "react";
import {
  Task,
  TaskStatus,
  TaskFilters,
  TaskForm,
  TaskList,
  Button,
} from "@/imports";
import { showSuccessToast, showErrorToast } from "@/app/utils/toast";

interface TaskFilter {
  status?: TaskStatus;
  category?: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>({});
  const [isLoading, setIsLoading] = useState(true); // ⬅️ loading state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true); // ⬅️ start loading
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
        showErrorToast("Error loading tasks");
      } finally {
        setIsLoading(false); // ⬅️ end loading
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (task: Omit<Task, "id">) => {
    if (!task.title.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const response = await res.json();
      if (response.success) {
        setTasks((prev) => [...prev, response.task]);
        showSuccessToast("Task added successfully!");
      }
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add task", error);
      showErrorToast("Failed to add task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      const response = await res.json();
      if (response.success) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
        showSuccessToast("Task deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete task", error);
      showErrorToast("Failed to delete task");
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const updatedTask = await res.json();

      if (!res.ok) {
        throw new Error(updatedTask.message || "Failed to update task");
      }

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask.task : task))
      );

      showSuccessToast("Task updated successfully!");
    } catch (error: unknown) {
      console.error("Failed to update task", error);

      const message =
        error instanceof Error ? error.message : "Failed to update task";

      showErrorToast(message);
    }
  };

  return (
    <div className="min-h-screen py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <Button onClick={() => setIsAdding(true)} className="text-sm">
            Add Task
          </Button>
        </div>

        <TaskFilters filter={filter} setFilter={setFilter} />

        {isAdding && (
          <TaskForm
            onAddTask={handleAddTask}
            onCancel={() => setIsAdding(false)}
          />
        )}

        <TaskList
          tasks={tasks}
          filter={filter}
          isLoading={isLoading}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default TaskManager;
