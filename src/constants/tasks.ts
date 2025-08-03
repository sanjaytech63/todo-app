export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
}
export const initialTasks: Task[] = [];

export const taskCategories = [
  'Personal',
  'Work',
  'Shopping',
  'Health',
  'Finance'
];

export const priorityOptions = [
  {
    value: 'low',
    label: 'Low',
    color: 'bg-blue-500'
  },
  {
    value: 'medium',
    label: 'Medium',
    color: 'bg-yellow-500'
  },
  {
    value: 'high',
    label: 'High',
    color: 'bg-red-500'
  }
];

export const statusOptions = [
  {
    value: 'pending',
    label: 'Pending',
    color: 'bg-gray-500'
  },
  {
    value: 'in-progress',
    label: 'In Progress',
    color: 'bg-blue-500'
  },
  {
    value: 'completed',
    label: 'Completed',
    color: 'bg-green-500'
  }
];