import { TaskStatus } from '@/imports';
import TaskItem from './TaskItem';
import type { Task, } from '@/constants/tasks';

interface TaskListProps {
  tasks: Task[];
  filter: { status?: TaskStatus; category?: string };
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskList = ({ tasks, filter, onDeleteTask, onStatusChange }: TaskListProps) => {
  const filteredTasks = tasks.filter(task => {
    if (filter.status && task.status !== filter.status) return false;
    if (filter.category && task.category !== filter.category) return false;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
        No tasks found. {filter.status || filter.category ? 'Try changing your filters.' : 'Add a new task to get started.'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;