import React from 'react';
import { Lock } from 'lucide-react';
import { useSidebar } from '../contexts/SidebarProvider';

export default function AccessDeclinePage() {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`min-h-screen w-full transition-all duration-300 bg-[#1a1f2e] text-white font-sans px-4 pt-16 pb-5 ${
        isCollapsed ? 'md:px-8' : 'md:px-4 md:pl-64 md:pr-8'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1e2536] rounded-lg p-8 shadow-lg relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0 bg-repeat"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            ></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#2a3241] flex items-center justify-center mb-4">
                <Lock size={32} className="text-[#8b95a9]" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
              <p className="text-xl text-[#8b95a9]">
                You don’t have permission to access this page.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-[#5d6b89] text-sm">
                If you believe this is a mistake, please contact your administrator or manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}