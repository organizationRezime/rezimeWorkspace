import React from 'react';
import { useSidebar } from '../../contexts/SidebarProvider';

export default function ProfileLoading() {
    const {isCollapsed} = useSidebar();
  return (
    <div
      className={`h-full min-h-screen w-screen bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 transition-all duration-300
      ${isCollapsed ? 'md:px-8' : 'md:px-4 md:pl-64 md:pr-8'} `}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 animate-pulse bg-[#2a3241] w-1/3 h-6 rounded"></h1>

        <div className="bg-[#1e2536] rounded-lg p-8 shadow-lg relative">
          {/* Skeleton Header */}
          <div className="flex flex-col md:flex-row items-start mb-8">
            <div className="flex-grow">
              <div className="w-1/2 h-6 animate-pulse bg-[#2a3241] rounded mb-2"></div>
              <div className="w-1/3 h-4 animate-pulse bg-[#8b95a9] rounded"></div>
            </div>
          </div>

          {/* Skeleton Info Items */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3241] animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b95a9] animate-pulse rounded"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3241] animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b95a9] animate-pulse rounded"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3241] animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b95a9] animate-pulse rounded"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3241] animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b95a9] animate-pulse rounded"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3241] animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b95a9] animate-pulse rounded"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3241] animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b95a9] animate-pulse rounded"></div>
              </div>
            </div>
          </div>

          {/* Skeleton Footer */}
          <div className="mt-12 pt-8 border-t border-[#2a3241]">
            <h3 className="text-xl font-semibold mb-4 animate-pulse bg-[#2a3241] w-1/4 h-6 rounded"></h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3241] animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b95a9] animate-pulse rounded"></div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a3241] animate-pulse"></div>
                <div className="w-24 h-4 bg-[#8b95a9] animate-pulse rounded"></div>
              </div>
            </div>
            <div className="w-2/3 h-4 animate-pulse bg-[#5d6b89] mt-6 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
