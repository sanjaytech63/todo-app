export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  category: string;
}

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish writing the project proposal document',
    dueDate: '2023-06-15',
    priority: 'high',
    status: 'in-progress',
    category: 'Work'
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, fruits',
    dueDate: '2023-06-10',
    priority: 'medium',
    status: 'todo',
    category: 'Personal'
  },
  {
    id: '3',
    title: 'Schedule team meeting',
    description: '',
    dueDate: '2023-06-12',
    priority: 'low',
    status: 'completed',
    category: 'Work'
  }
];

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
    value: 'todo',
    label: 'To Do',
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