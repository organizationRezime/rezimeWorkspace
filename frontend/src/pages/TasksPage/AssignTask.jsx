import React, { useEffect, useState } from "react";
import { useSidebar } from "../../contexts/SidebarProvider";
import { Calendar, Send } from "lucide-react";
import { useEmployee } from "../../contexts/EmployeeProvider";
import { useTeam } from "../../contexts/TeamProvider";
import { assignTask } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import AccessDeclinePage from "../AccessDeclinePage";

const AssignTask = () => {
  const { isCollapsed } = useSidebar();
  const { employee, level } = useEmployee();
  const { team } = useTeam();
  const [assignBtnLoading, setAssignBtnLoading] = useState(false);
  const navigate = useNavigate();

  const generateTaskId = (managerName, assignedToName) => {
    const randomNum = Math.floor(Math.random() * 900) + 100; // Generate random 3-digit number
  
    const getInitials = (name) =>
      name ? name.trim().slice(0, 3).toUpperCase() : "N/A";
  
    const date = new Date();
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase().slice(0, 3);
  
    const managerInitials = getInitials(managerName);
    const assignedToInitials = getInitials(assignedToName);
  
    return `${managerInitials}_${assignedToInitials}_${month}_${randomNum}`;
  };



  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedBy: employee?._id || "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
    category: "",
    taskId: generateTaskId(),
  });

  useEffect(() => {
    if (employee?._id) {
      setFormData((prev) => ({ ...prev, assignedBy: employee._id }));
    }
  }, [employee?._id]);

  useEffect(() => {
    if (employee?.fullname && formData.assignedTo) {
      const newTaskId = generateTaskId(employee.fullname, team.find(member => member._id === formData.assignedTo)?.fullname);
      setFormData((prev) => ({ ...prev, taskId: newTaskId }));
    }
  }, [employee?.fullname, formData.assignedTo, team]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAssignBtnLoading(true);

    const newTask = {
      ...formData,
      status: "pending",
      isRead: false,
    };

    try {
      await assignTask(newTask);
      navigate("/tasks");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      alert(`ERROR: ${errorMessage}`);
    } finally {
      setAssignBtnLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      priority: "medium",
      dueDate: "",
      category: "",
      taskId: generateTaskId(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    if(level < 2) return <AccessDeclinePage/>

  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 ${
        isCollapsed ? "md:px-8" : "md:px-4 md:pl-64 md:pr-8"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Assign New Task</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Create and assign tasks to team members
          </p>
        </div>

        {/* Task Assignment Form */}
        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task ID */}
            <div>
              <label
                htmlFor="taskId"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Task ID
              </label>
              <input
                type="text"
                id="taskId"
                name="taskId"
                value={formData.taskId}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  required
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Assigned By */}
              <div>
                <label
                  htmlFor="assignedByDisplay"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Assigned By
                </label>
                <input
                  type="text"
                  id="assignedByDisplay"
                  name="assignedByDisplay"
                  value={employee?.fullname || "Loading..."}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Assigned To */}
              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  required
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select a team member
                  </option>
                  {team.length === 0 ? (
                    <option disabled>No team members available</option>
                  ) : (
                    team.map((currEmployee, index) => (
                      <option key={index} value={currEmployee?._id}>
                        {currEmployee?.fullname}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Due Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    required
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={assignBtnLoading}
                className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                  assignBtnLoading ? "cursor-progress opacity-50" : ""
                }`}
              >
                <Send size={20} />
                {assignBtnLoading ? "Assigning..." : "Assign Task"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignTask;
