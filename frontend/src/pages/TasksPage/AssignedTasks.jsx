import React, { useState } from 'react';
import { useSidebar } from "../../contexts/SidebarProvider";
import { Search, Save, X } from 'lucide-react';

const AssignedTasks = () => {
  const { isCollapsed } = useSidebar();
  const [searchId, setSearchId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  
  // Sample task data - in real app, this would come from an API
  const [taskDatabase] = useState([
    {
      id: "TASK_JAN_131",
      title: "Update user documentation",
      description: "Review and update the existing user documentation...",
      assignedTo: "Alex Smith",
      assignedBy: "John Manager",
      priority: "high",
      dueDate: "2025-01-20",
      status: "pending",
      category: "Documentation",
    },
    {
      id: "TASK_JAN_132",
      title: "Fix navigation bug",
      description: "Address the navigation issue reported in the mobile app...",
      assignedTo: "Sarah Johnson",
      assignedBy: "Sarah Lead",
      priority: "medium",
      dueDate: "2025-01-15",
      status: "in-progress",
      category: "Development",
    }
  ]);

  const [currentTask, setCurrentTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const foundTask = taskDatabase.find(task => task.id.toLowerCase() === searchId.toLowerCase());
    if (foundTask) {
      setCurrentTask(foundTask);
      setEditedTask(foundTask);
      setError('');
    } else {
      setError('Task not found');
      setCurrentTask(null);
      setEditedTask(null);
    }
    setEditMode(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the task
    setCurrentTask(editedTask);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 ${
        isCollapsed ? "md:px-8" : "md:px-4 md:pl-64 md:pr-8"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Admin Task Lookup</h1>
          <p className="text-gray-400">Search and edit task details using the unique task ID</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Enter Task ID (e.g., TASK_JAN_131)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>

        {/* Task Details */}
        {currentTask && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-gray-400">{currentTask.id}</span>
                {editMode ? "- Edit Mode" : "- Task Details"}
              </h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Edit Task
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Save size={20} />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setEditedTask(currentTask);
                    }}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {editMode ? (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editedTask.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editedTask.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Assigned To</label>
                  <input
                    type="text"
                    name="assignedTo"
                    value={editedTask.assignedTo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={editedTask.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
                  <select
                    name="priority"
                    value={editedTask.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                  <select
                    name="status"
                    value={editedTask.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={editedTask.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Title</h3>
                  <p className="text-white">{currentTask.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Category</h3>
                  <p className="text-white">{currentTask.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Assigned To</h3>
                  <p className="text-white">{currentTask.assignedTo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Due Date</h3>
                  <p className="text-white">{new Date(currentTask.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Priority</h3>
                  <p className="text-white capitalize">{currentTask.priority}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Status</h3>
                  <p className="text-white capitalize">{currentTask.status}</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Description</h3>
                  <p className="text-white">{currentTask.description}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTasks;