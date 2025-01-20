import React from "react";

const TasksList = ({
  filteredTasks,
  handleTaskClick,
  isAssignedBy,
  changeTaskStatus,
  getPriorityColor,
  getStatusColor,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Desktop Headers - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-700 border-b border-gray-600">
        <div className="col-span-2 text-sm font-medium text-gray-300">Task ID</div>
        <div className="col-span-3 text-sm font-medium text-gray-300">Task</div>
        <div className="col-span-3 text-sm font-medium text-gray-300">Due Date</div>
        <div className="col-span-2 text-sm font-medium text-gray-300">Priority</div>
        <div className="col-span-2 text-sm font-medium text-gray-300">Status</div>
      </div>

      {/* Tasks */}
      <div className="divide-y divide-gray-700">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            <p>No tasks available to display.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.taskId}
              onClick={() => handleTaskClick(task)}
              className={`p-4 hover:bg-gray-700 cursor-pointer transition-colors ${
                !task.isRead ? "border-l-4 border-blue-500" : ""
              }`}
            >
              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm hidden md:block text-gray-400">
                    {task.taskId}
                  </span>
                  <h3 className="text-lg font-medium text-white">
                    {task.title.toUpperCase()}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {task.description}
                </p>
                <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="text-gray-400">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                  {isAssignedBy ? (
                    <select
                      value={task.status}
                      onChange={(e) => changeTaskStatus(task._id, e.target.value)}
                      className="bg-gray-700 text-white rounded-md px-2 py-1 text-sm"
                      onClick={(e) => e.stopPropagation()} // Prevent modal from opening when selecting
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid grid-cols-12 gap-4">
                <div className="col-span-2 text-sm text-gray-400">
                  {task.taskId}
                </div>
                <div className="col-span-3 text-sm font-medium text-white">
                  {task.title.toUpperCase()}
                </div>
                <div className="col-span-3 text-sm text-gray-400">
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
                <div className="col-span-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                <div className="col-span-2 text-sm">
                  {isAssignedBy ? (
                    <select
                      value={task.status}
                      onChange={(e) => changeTaskStatus(task._id, e.target.value)}
                      className="bg-gray-700 text-white rounded-md px-2 py-1 text-sm"
                      onClick={(e) => e.stopPropagation()} // Prevent modal from opening when selecting
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksList;
