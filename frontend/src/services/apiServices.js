import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = Cookies.get('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Methods
export const testApi = ()=> api.get('/');

// Employee routers
export const loginEmployee = (employeeId, password) => api.post('/employee/login', {employeeId, password});
export const registerEmployee = (data) => api.post('/employee/register', data);

// get employee. if _id is not given then get current employee details
export const getEmployee = (task_id="") => api.get(`/employee/get/${task_id}`);
export const getManagedEmployees = (employee_id) => api.get(`/employee/getManagedEmployees/${employee_id}`);

// attendance router
export const getAttendance = (employee_id)=> api.get(`/attendance/get/${employee_id}`);
export const markAttendance = () => api.post('/attendance/mark', {});

// task  router 
export const getTask = (id) => api.get(`/tasks/get/${id}`); // id can be _id or taskId
export const assignTask = (data) => api.post('/tasks/assign', data);

export const getTasksAssignedToEmployee = (employee_id) => api.get(`/tasks/tasksAssignedToEmployee/${employee_id}`);
export const getTasksAssignedByEmployee = (employee_id) => api.get(`/tasks/tasksAssignedByEmployee/${employee_id}`);

export const updateTask = (task_id, status) => api.post('/tasks/update', {task_id, status});
// const deleteTask = (taskId) => api.post('/tasks/delete', {taskId});

export const markTaskAsRead = (task_id) => api.post('/tasks/markasread', {task_id});
export const archiveTask = (task_id) => api.post('/tasks/archive', {task_id});