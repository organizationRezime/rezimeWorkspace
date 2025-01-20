import React from "react";
import { useSidebar } from "../../contexts/SidebarProvider";

const TasksLoading = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`min-h-screen w-full bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 ${
        isCollapsed ? "md:px-8" : "md:px-4 md:pl-64 md:pr-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 grid min-w-full col-span-2 md:row-span-2 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Task Management</h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage and track your assigned tasks</p>
          </div>
        </div>

        {/* Skeleton Loader for Task List Rows */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* Skeleton Rows */}
          <div className="divide-y divide-gray-700">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="p-4 bg-gray-700 animate-pulse rounded-lg mb-4">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksLoading;
