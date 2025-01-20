import { createContext, useContext, useEffect, useState } from 'react';
import { getEmployee } from '../services/apiServices';
import Cookies from 'js-cookie';

export const EmployeeContext = createContext();

export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [employeeError, setEmployeeError] = useState(null);
  const [employeeLoading, setEmployeeLoading] = useState(false); // Default to false until fetch starts
  const token = Cookies.get("token"); // Use `Cookies.get` to check for the token

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setEmployeeLoading(true);
        setEmployeeError(null);

        const res = await getEmployee();
        if (res.status === 200) {
          setEmployee(res.data); 
          // console.log(res.data);
          
        } else {
          setEmployeeError(`Unexpected status code: ${res.status}`);
        }
      } catch (e) {
        setEmployeeError("Failed to fetch employee data. Please try again later.");
        console.error("Error while fetching employee details", e);
      } finally {
        setEmployeeLoading(false);
      }
    };

    if (token) {
      fetchEmployee();
    } else {
      setEmployeeLoading(false);
    }
  }, [token]);
  return (
    <EmployeeContext.Provider value={{ employee, setEmployee, employeeError, employeeLoading, level: employee?.level }}>
      {children}
    </EmployeeContext.Provider>
  );
};
