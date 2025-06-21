import { TaskStatus } from '@/types/task';
import { statusOptions, taskCategories } from '@/constants/tasks';

interface TaskFilter {
  status?: TaskStatus;
  category?: string;
}

interface TaskFiltersProps {
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
}

const TaskFilters = ({ filter, setFilter }: TaskFiltersProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      status: value ? value as TaskStatus : undefined
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      category: value || undefined
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filter.status || ''}
            onChange={handleStatusChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filter.category || ''}
            onChange={handleCategoryChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">All Categories</option>
            {taskCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setFilter({})}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition"
            aria-label="Clear filters"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;