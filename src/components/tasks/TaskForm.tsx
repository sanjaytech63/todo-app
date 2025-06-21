"use client";

import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { priorityOptions, taskCategories } from '@/constants/tasks';
import { Button, InputField, Task, TaskPriority, TextAreaField } from '@/imports';
import SelectField from '../SelectField';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

const TaskForm = ({ onAddTask, onCancel }: TaskFormProps) => {
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'todo',
    category: 'Personal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTask);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputField
            type="text"
            label='Title'
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Task title"
            required
          />
        </div>
        <div>
          <TextAreaField
            label='Description'
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
            placeholder="Task description"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <InputField
              label='Due Date'
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
          </div>
          <div>
            <SelectField
              label="Priority"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
              options={priorityOptions}
              id="task-priority"
            />
          </div>
          <div>
            <SelectField
              label="Category"
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              options={taskCategories.map(category => ({
                value: category,
                label: category
              }))}
              id="task-category"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <Button type="submit" >
            <FiPlus className="mr-2" />
            Add Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;