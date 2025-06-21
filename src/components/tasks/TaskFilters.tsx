import { statusOptions, taskCategories } from '../../constants/tasks';

interface TaskFiltersProps {
  filter: { status?: string; category?: string };
  setFilter: (filter: { status?: string; category?: string }) => void;
}

const TaskFilters = ({ filter, setFilter }: TaskFiltersProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filter.status || ''}
            onChange={(e) => setFilter({ ...filter, status: e.target.value || undefined })}
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
            onChange={(e) => setFilter({ ...filter, category: e.target.value || undefined })}
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
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;