import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { useSidebar } from "../contexts/SidebarProvider";
import { useEmployee } from "../contexts/EmployeeProvider";
import { registerEmployee } from "../services/apiServices";
import { useTeam } from "../contexts/TeamProvider";
import { useNavigate } from "react-router-dom";
import AccessDeclinePage from "./AccessDeclinePage";

const RegisterEmployee = () => {
  const { isCollapsed } = useSidebar();
  const { employee, level } = useEmployee();
  const { fetchTeam } = useTeam();
  const navigation = useNavigate();
  const [registerBtnLoading, setRegisterBtnLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    employeeId: "",
    manager: "",
    address: "",
    number: "",
    email: "",
    password: "",
    position: "Employee",
  });

  useEffect(() => {
    if (employee) {
      setFormData((prev) => ({
        ...prev,
        manager: employee.employeeId,
      }));
    }
  }, [employee]);

  useEffect(() => {
    if (formData.fullname && formData.employeeId.length < 12) {
      const newEmployeeId = generateEmployeeId(formData.fullname);
      setFormData((prev) => ({
        ...prev,
        employeeId: newEmployeeId, 
      }));
    }
  }, [formData.fullname]); 
  
  // Function to generate employee ID based on the first 3 letters of the full name
  const generateEmployeeId = (fullname) => {
    const firstName = fullname.split(' ')[0]; 
    const namePrefix = firstName.substring(0, 3).toUpperCase(); 
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `EMP-${namePrefix}-${randomSuffix}`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { ...formData };

    setRegisterBtnLoading(true);

    try {
      const res = await registerEmployee(newEmployee);
      if (res.status === 201) {
        console.log("new employee created!", res.data);
        fetchTeam();
        navigation("/team");
      }
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    alert(`ERROR: ${errorMessage}`);
  } finally {
      setRegisterBtnLoading(false);
    }
  };


  const resetForm = () => {
    setFormData({
      fullname: "",
      employeeId: "",
      manager: "",
      address: "",
      number: "",
      email: "",
      password: "",
      position: "Employee",
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Register New Employee</h1>
          <p className="text-gray-400 text-sm sm:text-base">Register a new employee with the required details</p>
        </div>

        {/* Employee Registration Form */}
        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>

            {/* Employee ID */}
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-300 mb-2">
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId} // Allow user to modify it if needed
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Employee ID will be generated or can be modified"
              />
            </div>

            {/* Manager */}
            <div>
              <label htmlFor="manager" className="block text-sm font-medium text-gray-300 mb-2">
                Manager
              </label>
              <input
                type="text"
                id="manager"
                name="manager"
                required
                value={formData.manager}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter manager's employee Id"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
              />
            </div>

            {/* Number */}
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-2">
                Contact Number
              </label>
              <input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact number"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter position (e.g., Employee)"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
            <button
                type="submit"
                className={`flex-1 ${registerBtnLoading ? 'bg-gray-600 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors`}
                disabled={registerBtnLoading}
              >
                {registerBtnLoading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    <Send size={20} />
                    Register Employee
                  </>
                )}
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

export default RegisterEmployee;