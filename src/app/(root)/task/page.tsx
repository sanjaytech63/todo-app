"use client";

import { useState } from 'react';
import { Task, initialTasks, TaskFilters, TaskForm, TaskList, Button, TaskStatus } from '@/imports';

interface TaskFilter {
  status?: TaskStatus;
  category?: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>({});

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    if (!task.title.trim()) return;

    const newTask: Task = {
      ...task,
      id: Date.now().toString()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsAdding(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  return (
    <div className="min-h-screen py-16 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <Button
            onClick={() => setIsAdding(true)}
            className="text-sm"
            aria-label="Add new task"
          >
            Add Task
          </Button>
        </div>

        <TaskFilters
          filter={filter}
          setFilter={setFilter}
        />

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