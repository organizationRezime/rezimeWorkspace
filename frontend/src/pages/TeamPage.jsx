import React, { useEffect, useState } from "react";
import { useSidebar } from "../contexts/SidebarProvider";
import { useTeam } from "../contexts/TeamProvider";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../contexts/EmployeeProvider";
import AccessDeclinePage from "./AccessDeclinePage";

const TeamManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {level} = useEmployee();

  const { isCollapsed } = useSidebar();
  const { team } = useTeam();
  const navigate = useNavigate(); 


  // Filter team members based on the search query
  const filteredTeam = searchQuery
    ? team.filter((employee) => employee.fullname.toLowerCase().includes(searchQuery.toLowerCase())) : team; // If searchQuery is empty, show the full team
    
  if(level < 2) return <AccessDeclinePage/>
  
  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 ${
        isCollapsed ? "md:px-8" : "md:px-4 md:pl-64 md:pr-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Team</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search employee..."
            className="w-full max-w-sm px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="ml-4 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            onClick={() => navigate("/team/register")}
          >
            Register New Employee
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {filteredTeam.length > 0 ? (
            filteredTeam.map((employee) => (
              <div
                key={employee.employeeId}
                className="flex justify-between items-center px-6 py-4 border-b border-gray-700"
              >
                <div>
                  <p className="text-lg font-medium">{employee.fullname}</p>
                  <p className="text-sm text-gray-400">ID: {employee.employeeId}</p>
                </div>
                <button
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                  onClick={() =>
                    alert(`View details for ${employee.fullname}`)
                  }
                >
                  View Employee Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-gray-400">No employees found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
