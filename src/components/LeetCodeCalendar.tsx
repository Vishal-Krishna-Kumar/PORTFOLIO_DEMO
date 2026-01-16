import React, { useMemo } from "react";
import Tooltip from "./Tooltip";

interface SubmissionCalendarProps {
  submissionCalendar: {
    [timestamp: string]: number;
  };
  viewMode?: "week" | "month";
  isDark?: boolean;
}

const LeetCodeCalendar: React.FC<SubmissionCalendarProps> = React.memo(({
  submissionCalendar,
  viewMode = "week",
  isDark = true,
}) => {
  const today = new Date();

  const normalizedSubmissions = useMemo(() => {
    const map = new Map<string, number>();
    Object.keys(submissionCalendar).forEach((ts) => {
      const count = submissionCalendar[ts];
      const date = new Date(parseInt(ts) * 1000);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const key = `${year}-${month}-${day}`;
      map.set(key, (map.get(key) || 0) + count);
    });
    return map;
  }, [submissionCalendar]);

  const getSubmissionCount = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const key = `${year}-${month}-${day}`;
    return normalizedSubmissions.get(key) || 0;
  };

  const getCellStyles = (count: number) => {
    if (count === 0) return isDark ? "bg-gray-800 text-gray-600" : "bg-gray-100 text-gray-300";
    if (count <= 2) return "bg-green-900/80 text-green-100";
    if (count <= 5) return "bg-green-700 text-white";
    if (count <= 10) return "bg-green-500 text-white";
    return "bg-green-400 text-white";
  };

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  if (viewMode === "month") {
    const year = today.getFullYear();
    const month = today.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const daysInMonth: Date[] = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      daysInMonth.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const firstDayOfMonth = startDate.getDay();
    const monthName = today.toLocaleString("default", { month: "long" });

    return (
      <div className="flex flex-col items-center mt-2 w-full px-2 select-none">
        <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {monthName} {year}
        </p>
        <div className="grid grid-cols-7 gap-1 w-full text-center mb-1">
          {daysOfWeek.map((day, i) => (
            <div key={i} className={`text-[10px] font-bold ${isDark ? "text-gray-600" : "text-gray-400"}`}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 w-full">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {daysInMonth.map((day, index) => {
            const count = getSubmissionCount(day);
            const style = getCellStyles(count);
            const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();
            
            return (
              <Tooltip key={index} text={`${count} submissions on ${day.toDateString()}`}>
                <div className={`
                    w-full aspect-square flex items-center justify-center rounded-md 
                    transition-all duration-200 hover:scale-110 hover:shadow-lg
                    ${style} ${isToday ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-transparent" : ""}
                `}>
                  <span className="text-[10px] font-medium">{day.getDate()}</span>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  }

  // Week View
  const currentDayOfWeek = today.getDay(); 
  const weekStartDate = new Date(today);
  weekStartDate.setDate(today.getDate() - currentDayOfWeek);
  weekStartDate.setHours(0, 0, 0, 0);

  const daysInWeek: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStartDate);
    day.setDate(weekStartDate.getDate() + i);
    daysInWeek.push(day);
  }

  return (
    <div className="flex flex-col items-center mt-2 w-full px-2 select-none">
      <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Week's Activity
      </p>
      <div className="grid grid-cols-7 gap-2 w-full">
        {daysInWeek.map((day, index) => {
          const count = getSubmissionCount(day);
          const style = getCellStyles(count);
          const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();
          
          return (
            <Tooltip key={index} text={`${count} submissions on ${day.toLocaleDateString()}`}>
              <div className="flex flex-col items-center gap-1">
                <span className={`text-[10px] font-bold ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                  {daysOfWeek[index]}
                </span>
                <div className={`
                    w-8 h-8 flex items-center justify-center rounded-md 
                    transition-all duration-200 hover:scale-110 hover:shadow-md
                    ${style} ${isToday ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-transparent" : ""}
                `}>
                  <span className="text-xs font-medium">{day.getDate()}</span>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
});

export default LeetCodeCalendar;
