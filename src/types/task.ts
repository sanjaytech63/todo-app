export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
}

export interface PriorityOption {
  value: TaskPriority;
  label: string;
  color: string;
}

export interface StatusOption {
  value: TaskStatus;
  label: string;
  color: string;
}

