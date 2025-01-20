import React from 'react';
import { useSidebar } from '../../contexts/SidebarProvider';

const DashboardLoading = () => {
  const {isCollapsed} = useSidebar();
  return (
    <div
      className={`h-full min-h-screen w-screen bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 transition-all duration-300
      ${isCollapsed ? 'md:px-8' : 'md:px-4 md:pl-64 md:pr-8'} `}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title Skeleton */}
        <div className="animate-pulse mb-8">
          <div className="h-8 bg-[#2c3644] rounded w-1/2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Attendance Status Skeleton */}
            <div className="bg-[#1e2536] rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-[#2c3644] rounded mb-4 w-2/3"></div>
              <div className="h-4 bg-[#2c3644] rounded mb-4 w-1/3"></div>
              <div className="h-4 bg-[#2c3644] rounded mb-4 w-1/2"></div>
              <div className="h-10 bg-[#2c3644] rounded mb-4 w-2/3"></div>
            </div>

            {/* Attendance History Skeleton */}
            <div className="bg-[#1e2536] rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-[#2c3644] rounded mb-4 w-1/2"></div>
              <div className="space-y-4">
                <div className="h-6 bg-[#2c3644] rounded mb-2 w-3/4"></div>
                <div className="h-6 bg-[#2c3644] rounded mb-2 w-3/4"></div>
                <div className="h-6 bg-[#2c3644] rounded mb-2 w-3/4"></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Calendar Skeleton */}
            <div className="bg-[#1e2536] rounded-lg p-6 animate-pulse h-80">
              <div className="h-6 bg-[#2c3644] rounded mb-4 w-1/3"></div>
              <div className="h-5 bg-[#2c3644] rounded mb-4 w-1/2"></div>
            </div>

            {/* Notifications Skeleton */}
            <div className="bg-[#1e2536] rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-[#2c3644] rounded mb-4 w-1/2"></div>
              <div className="space-y-4">
                <div className="h-4 bg-[#2c3644] rounded w-3/4"></div>
                <div className="h-4 bg-[#2c3644] rounded w-3/4"></div>
                <div className="h-4 bg-[#2c3644] rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
