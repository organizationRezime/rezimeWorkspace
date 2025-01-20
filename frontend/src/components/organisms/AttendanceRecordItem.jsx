export const AttendanceRecordItem = ({ record }) => {
    const formatTime = (date) => 
      date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  
    const date = new Date(record.date);
    return (
      <div className="flex justify-between items-center ">
        <span className="text-gray-400">{`${date.toLocaleDateString()} at ${formatTime(date)}`}</span>
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          {record.status}
        </span>
      </div>
    );
  };
  