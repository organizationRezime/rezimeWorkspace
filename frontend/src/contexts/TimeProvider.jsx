import { useState } from "react"
import { TimeContext } from "./TimeContext"

export const TimeProvider = ({children})=>{
    const [time, setTime] = useState({
        meetStart: "9:00",
        meetEnd: "",
        attendanceStart: "",
        attendanceEnd: ''
    });

    return(
        <TimeContext.Provider value={{time}}>
            {children}
        </TimeContext.Provider>
    )
}