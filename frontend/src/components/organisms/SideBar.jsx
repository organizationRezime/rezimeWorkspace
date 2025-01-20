import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, User, HelpCircle, LogOut, ChevronLeft, ListTodo, Mail, Contact } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarProvider';
import Cookies from 'js-cookie'; 
import { useTasks } from '../../contexts/TasksProvider';

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const navigate = useNavigate();
  const {tasksAssignedToEmployee} = useTasks();

  const [newTaskPing, setNewTaskPing] = useState(false); // State for ping animation

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  
  const menuItems = [
    { name: "Dashboard", slug: "/dashboard", Icon: Home },
    { name: "Profile", slug: "/profile", Icon: User },
    { name: "Tasks", slug: "/tasks", Icon: ListTodo },
    { name: "Email", slug: "/email", Icon: Mail },
    { name: "Team", slug: "/team", Icon: Contact },
    { name: "Help", slug: "/help", Icon: HelpCircle },
  ];

  useEffect(() => {
    const ifNewTask = () => {
      if (!tasksAssignedToEmployee) return false; // Handle the case where tasks are not loaded yet
      return tasksAssignedToEmployee.some((task) => task.isRead === false);
    };
  
    setNewTaskPing(ifNewTask()); 
  }, [tasksAssignedToEmployee]);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <div
      className={`fixed top-0 h-screen z-50 bg-gray-900 text-gray-400 flex flex-col justify-between p-4 transition-all duration-300 ${
        isCollapsed ? '-left-64' : 'left-0'
      } w-64`}
    >
      <button
        onClick={toggleSidebar}
        className={`transition-all duration-300 z-50 fixed top-4 ${isCollapsed ? "left-4" : "left-52"} p-2 rounded-lg bg-gray-800`}
      >
        <ChevronLeft
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-white text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Rezime</h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.slug}
              className={({ isActive }) =>
                `relative flex items-center p-2 rounded-lg ${
                  isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'
                }`
              }
            >
              <item.Icon className="h-5 w-5 mr-3" />
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.name}</span>
              {item.name === "Tasks" && newTaskPing && (
                <span
                  className="absolute right-3 h-2.5 w-2.5 animate-pulse rounded-full bg-red-500"
                >
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center p-2 text-red-500 hover:text-red-600"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
