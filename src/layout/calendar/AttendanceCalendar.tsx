import { useState } from "react";
import DateDetails from "./DateDetails";
import { useParams } from "react-router";

const AttendanceCalendar = () => {
  // State to track current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todaysDate, setTodaysDate] = useState(new Date());
  const { name } = useParams();
  // const todaysDate = new Date();

  // Function to move to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
    setTodaysDate(new Date());
  };

  // Function to move to the next month
  const goToNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
    setTodaysDate(new Date());
  };

  // Function to handle month change
  const handleMonthChange = (e: any) => {
    const month = parseInt(e.target.value);
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), month, 1));
  };

  // Function to handle year change
  const handleYearChange = (e: any) => {
    const year = parseInt(e.target.value);
    setCurrentDate((prevDate) => new Date(year, prevDate.getMonth(), 1));
  };

  // Get the current month
  const currentMonth = currentDate.getMonth();

  // Get the current year
  const currentYear = currentDate.getFullYear();

  // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the starting day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Create an array to hold the days of the month
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  // Define Tailwind CSS classes
  const dayClass = "border border-gray-200 p-2";
  const sundayClass = "bg-blue-400";
  const saturdayClass = "bg-blue-400"; // Define Saturday class
  const currentDateClass = "bg-yellow-300";

  // Function to determine if a Saturday is the 2nd or 4th Saturday in the month
  const is2ndOr4thSaturday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    const weekOfMonth = Math.ceil((day + firstDayOfMonth) / 7);
    return dayOfWeek === 6 && (weekOfMonth === 2 || weekOfMonth === 4);
  };

  // Function to handle click on a day
  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="flex">
      <div className="bg-white p-8 shadow-md rounded-md max-w-md mt-8 w-full h-fit">
        <div className="mb-4">
          <label className="text-2xl font-semibold mb-4 text-center">
            {name}
          </label>
        </div>
        <div className="flex justify-between items-center mb-4 ">
          <button onClick={goToPreviousMonth}>&lt; Prev</button>
          <div>
            <select value={currentMonth} onChange={handleMonthChange}>
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
                  {new Date(currentYear, index).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <select value={currentYear} onChange={handleYearChange}>
              {Array.from(
                { length: 10 },
                (_, index) => currentYear - 5 + index
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button onClick={goToNextMonth}>Next &gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Add empty cells for days before the first day of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="text-center"></div>
          ))}
          {/* Render days of the month */}
          {daysArray.map((day) => {
            // const currentDateObj = new Date(currentYear, currentMonth, day);
            const isCurrentDate =
              day === todaysDate.getDate() &&
              currentMonth === todaysDate.getMonth() &&
              currentYear === todaysDate.getFullYear();

            const isCurrentMonth = currentMonth === currentDate.getMonth();
            const isCurrentYear = currentYear === currentDate.getFullYear();
            return (
              <div
                key={day}
                className={`${dayClass} ${
                  new Date(currentYear, currentMonth, day).getDay() === 0
                    ? sundayClass
                    : new Date(currentYear, currentMonth, day).getDay() === 6
                    ? is2ndOr4thSaturday(day)
                      ? saturdayClass
                      : ""
                    : ""
                }${
                  isCurrentDate && isCurrentMonth && isCurrentYear
                    ? currentDateClass
                    : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4 w-full">
        <DateDetails currentDate={selectedDate} />
      </div>
    </div>
  );
};

export default AttendanceCalendar;
