import React, { useEffect, useState } from "react";
import { useSidebar } from "../../contexts/SidebarProvider";
import { ChevronDown, ChevronUp, Filter, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../contexts/EmployeeProvider";
import { useTasks } from "../../contexts/TasksProvider";
import TasksLoading from "../../components/loadings/TasksLoading";
import TasksList from "../../components/organisms/TasksList";
import Modal from "../../components/organisms/Modal";
import { markTaskAsRead, updateTask } from "../../services/apiServices";

const TaskManagementPage = () => {
  const {
    setTasksAssignedByEmployee,
    tasksAssignedToEmployee,
    tasksAssignedByEmployee,
    tasksLoading,
    setTasksAssignedToEmployee,
    tasksError,
    refreshTasks,
  } = useTasks();
  const { level } = useEmployee();
  const [isAssignedBy, setIsAssignedBy] = useState(false);
  const [tasks, setTasks] = useState([]);

  const changeTaskStatus = async (task_id, newStatus) => {

    try {
      await updateTask(task_id, newStatus);
      const updatedTasks = tasks.map((task) =>
        task._id === task_id ? { ...task, status: newStatus } : task
      );
  
      setTasksAssignedByEmployee(updatedTasks);
    } catch (error) {
      console.error("Error while updating status", error);
    }
 

  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleTaskClick = async (task) => {
    setSelectedTask(task);
    setShowModal(true);

    if (isAssignedBy || task.isRead) return;
      try {
        await markTaskAsRead(task._id);
        const updatedTasks = tasks.map((t) =>
          t._id === task._id ? { ...t, isRead: true } : t
        );
        setTasksAssignedToEmployee(updatedTasks);
      } catch (error) {
        console.error("Somethng went wrong while marking as read", error);
      }
  };

  const handleisAssignedToEmployee = () => {
    setIsAssignedBy((prev) => !prev);
  };

  useEffect(() => {
    if (isAssignedBy) {
      setTasks(tasksAssignedByEmployee);
    } else {
      setTasks(tasksAssignedToEmployee);
    }
  }, [isAssignedBy, tasksAssignedByEmployee, tasksAssignedToEmployee]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-500";
      case "in-progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (tasksLoading) return <TasksLoading />;

  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 ${
        isCollapsed ? "md:px-8" : "md:px-4 md:pl-64 md:pr-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 grid min-w-full col-span-2 md:row-span-2 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Task Management
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage and track your assigned tasks
            </p>
          </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={refreshTasks}
                className="px-4 py-2 mt-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800 md:mt-0 flex items-center gap-2"
              >
                <RefreshCw size={20} />
                Refresh
              </button>
              {level > 1 && (<>

              <button
                onClick={() => navigate("/tasks/assign")}
                className="px-4 py-2 mt-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 md:mt-0"
              >
                Assign a new Task
              </button>

              <button
                onClick={handleisAssignedToEmployee}
                className="px-4 py-2 mt-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 md:mt-0"
              >
                {isAssignedBy
                  ? "Tasks assigned to you"
                  : "Tasks assigned by you"}
              </button>

            </>)}

            </div>
          
        </div>

        {/* Mobile Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 mb-4 text-gray-400 hover:text-white md:hidden"
        >
          <Filter size={20} />
          <span>Filters</span>
          {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {/* Filters */}
        <div
          className={`space-y-4 mb-6 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <select
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* tasks list */}

        <TasksList
          filteredTasks={filteredTasks}
          handleTaskClick={handleTaskClick}
          isAssignedBy={isAssignedBy}
          changeTaskStatus={changeTaskStatus}
          getPriorityColor={getPriorityColor}
          getStatusColor={getStatusColor}
        />

        {/* Task Detail Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          {selectedTask && (
            <div className="space-y-6 text-white">
              <div>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 pr-8">
                    <h2 className="text-xl sm:text-2xl font-bold flex-1">
                      {selectedTask.title}
                    </h2>
                    <div className="inline-flex items-center px-3 py-1 bg-gray-700 rounded-lg shrink-0">
                      <span className="text-xs font-semibold text-gray-400 mr-2">
                        TASK ID
                      </span>
                      <span className="text-sm font-mono text-gray-200">
                        {selectedTask.taskId}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-300">{selectedTask.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        Category
                      </h4>
                      <p className="text-gray-300">{selectedTask.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        Assigned By
                      </h4>
                      <p className="text-gray-300">
                        {selectedTask.assignedByName}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        Due Date
                      </h4>
                      <p className="text-gray-300">
                        {new Date(selectedTask.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">
                        Status
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                          selectedTask.status
                        )}`}
                      >
                        {selectedTask.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default TaskManagementPage;
