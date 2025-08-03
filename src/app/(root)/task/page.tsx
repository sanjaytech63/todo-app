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
import { showSuccessToast } from "@/app/utils/toast";

interface TaskFilter {
  status?: TaskStatus;
  category?: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
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
        showSuccessToast('Task added successfully!');
      }
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      const response = await res.json();
      if (response.success) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        showSuccessToast('Task added successfully!');
      }
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const updatedTask = await res.json();

      if (updatedTask.success) {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? updatedTask : task))
        );
        showSuccessToast('Task added successfully!');
      }

    } catch (error) {
      console.error("Failed to update task", error);
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
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default TaskManager;
