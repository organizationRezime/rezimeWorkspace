import { createContext, useContext, useEffect, useState } from "react";
import { useEmployee } from "./EmployeeProvider";
import { getManagedEmployees } from "../services/apiServices";

export const TeamContext = createContext();
export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState([]);
    const { level, employee } = useEmployee();

    const fetchTeam = async () => {
        try {
            if (level < 1) throw new Error("You don't have permission to fetch team");

            const res = await getManagedEmployees(employee._id);
            if (res.status !== 200) throw new Error("Something went wrong while fetching teams");
            setTeam(res.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (employee) { // Check if employee is available
            fetchTeam();
        }
    }, [employee]); // Effect depends on the employee state

    return (
        <TeamContext.Provider value={{ team, fetchTeam }}>
            {children}
        </TeamContext.Provider>
    );
};
