import { useState, useEffect } from "react";
import { useSidebar } from "../contexts/SidebarProvider";
import { useEmployee } from "../contexts/EmployeeProvider";
import { Button } from "../components/atoms/Button";
import GlobalError from "../components/Errors/GlobalError";
import { markAttendance, getAttendance } from "../services/apiServices";
import { Card } from "../components/organisms/Card";
import { Calendar } from "../components/organisms/Calendar";
import { AttendanceRecordItem } from "../components/organisms/AttendanceRecordItem";
import { NotificationItem } from "../components/organisms/NotificationItem";

export default function DashboardPage() {
  const { isCollapsed } = useSidebar();
  const { employee, employeeError, employeeLoading, setEmployee } =
    useEmployee();

  const { fullname, lastAttendance } = employee || {};
  const [isMarkedToday, setIsMarkedToday] = useState(true);
  const [isMarkButtonLoading, setIsMarkButtonLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceRecordsLoading, setAttendanceRecordsLoading] =
    useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const checkAttendance = () => {
    const today = new Date();
    const lastDate = new Date(lastAttendance);
    setIsMarkedToday(
      lastDate.getDate() === today.getDate() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getFullYear() === today.getFullYear()
    );
  };

  const fetchAttendance = async () => {
    try {
      setAttendanceRecordsLoading(true);
      const res = await getAttendance(employee._id);
      setAttendanceRecords(res.data || []);
    } catch {
      console.error("Error fetching attendance records");
    } finally {
      setAttendanceRecordsLoading(false);
    }
  };

  useEffect(() => {
    if (employee) {
      checkAttendance();
      fetchAttendance();
    }
  }, [employee]);

  const handleMarkAttendance = async () => {
    setIsMarkButtonLoading(true);
    try {
      await markAttendance();
      setIsMarkedToday(true);
      setEmployee({ ...employee, lastAttendance: new Date() });
    } catch {
      alert("Error marking attendance");
    } finally {
      setIsMarkButtonLoading(false);
    }
  };

  // if (employeeLoading) return <DashboardLoading />;
  if (employeeError) return <GlobalError />;

  return (
    <div
      className={`h-full min-h-screen w-screen transition-all duration-300 bg-[#1a1f2e] text-white px-4 pt-16 pb-5 ${
        isCollapsed ? "md:px-8" : "md:px-4 md:pl-64 md:pr-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Hello, {fullname}! 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card
              className=""
              loading={employeeLoading}
              title="Attendance Status"
            >
              <p className="text-gray-400 mb-4">
                Mark your attendance for today
              </p>
              <Button
                disabled={isMarkedToday || isMarkButtonLoading}
                onClick={handleMarkAttendance}
                className="text-gray-400 px-4 py-2 rounded transition-colors"
              >
                {isMarkButtonLoading
                  ? "Marking..."
                  : isMarkedToday
                  ? "Attendance Marked"
                  : "Mark Attendance"}
              </Button>
            </Card>
            <Card
              className=""
              loading={attendanceRecordsLoading}
              title="Attendance History"
            >
              <div className="flex flex-col gap-2">
                {attendanceRecords.map((record, index) => (
                  <AttendanceRecordItem key={index} record={record} />
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="" title="Calendar">
              <Calendar
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
              />
            </Card>

            <Card className="" title="Notifications">
              {notifications.length ? (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))
              ) : (
                <p className="text-gray-400">No notifications</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
