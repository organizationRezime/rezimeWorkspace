import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getTasksAssignedByEmployee, getTasksAssignedToEmployee } from "../services/apiServices";
import { useEmployee } from "./EmployeeProvider";

export const TasksContext = createContext();
export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
  const { level, employee } = useEmployee();
  const [tasksAssignedByEmployee, setTasksAssignedByEmployee] = useState([]);
  const [tasksAssignedToEmployee, setTasksAssignedToEmployee] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setTasksLoading(true);
      setTasksError(null);

      // Fetch tasks assigned by the employee if the level > 1
      if (level > 1) {
        const resBy = await getTasksAssignedByEmployee(employee._id);
        if (resBy.status === 200) setTasksAssignedByEmployee(resBy.data);
      }

      // Fetch tasks assigned to the employee
      const resTo = await getTasksAssignedToEmployee(employee._id);
      if (resTo.status === 200) setTasksAssignedToEmployee(resTo.data);
    } catch (e) {
      setTasksError(e);
      console.log("Error while fetching tasks:", e);
    } finally {
      setTasksLoading(false);
    }
  }, [employee, level]);

  useEffect(() => {
    if (employee) fetchTasks();
  }, [employee, fetchTasks]);

  const refreshTasks = () => {
    if (employee) fetchTasks();
  };

  return (
    <TasksContext.Provider
      value={{
        tasksAssignedByEmployee,
        setTasksAssignedByEmployee,
        setTasksAssignedToEmployee,
        tasksAssignedToEmployee,
        tasksLoading,
        tasksError,
        refreshTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
