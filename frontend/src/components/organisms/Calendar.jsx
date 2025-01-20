import { useState } from 'react';

export const Calendar = ({ currentMonth, setCurrentMonth }) => {
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);
    const today = new Date();

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    for (let i = 1; i <= days; i++) {
      const isToday =
        i === today.getDate() &&
        currentMonth.getMonth() === today.getMonth() &&
        currentMonth.getFullYear() === today.getFullYear();

      calendarDays.push(
        <div
          key={i}
          className={`h-8 flex items-center justify-center text-sm ${
            isToday ? 'bg-blue-500 rounded-full text-white' : 'text-gray-400'
          }`}
        >
          {i}
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-400 hover:text-white">
          &lt;
        </button>
        <h3 className="text-lg font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={nextMonth} className="text-gray-400 hover:text-white">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-gray-400 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-sm font-semibold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  );
};
