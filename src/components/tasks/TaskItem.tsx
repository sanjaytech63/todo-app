import { FiCheck, FiTrash2, FiCalendar, FiTag } from 'react-icons/fi';
import type { Task } from '@/constants/tasks';
import { priorityOptions, statusOptions } from '@/constants/tasks';
import { TaskStatus } from '@/imports';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskItem = ({ task, onDelete, onStatusChange }: TaskItemProps) => {
  const priority = priorityOptions.find(p => p.value === task.priority);
  const status = statusOptions.find(s => s.value === task.status);

  const handleStatusToggle = () => {
    const newStatus: TaskStatus = task.status === 'completed' ? 'todo' : 'completed';
    onStatusChange(task.id, newStatus);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {priority && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color} text-white`}>
                {priority.label}
              </span>
            )}
            {status && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color} text-white`}>
                {status.label}
              </span>
            )}
            {task.category && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 flex items-center">
                <FiTag className="mr-1" size={12} />
                {task.category}
              </span>
            )}
            {task.dueDate && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 flex items-center">
                <FiCalendar className="mr-1" size={12} />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleStatusToggle}
            className={`p-2 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-80 transition`}
            aria-label={task.status === 'completed' ? 'Mark as To Do' : 'Mark as Completed'}
          >
            <FiCheck />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-opacity-80 transition"
            aria-label="Delete task"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;