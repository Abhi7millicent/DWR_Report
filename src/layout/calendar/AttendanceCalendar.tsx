import { useState, useEffect } from "react";
import DateDetails from "./DateDetails";
import { useParams } from "react-router";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const AttendanceCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // const [todaysDate, setTodaysDate] = useState<Date>(new Date());
  const todaysDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState<{
    [date: string]: string;
  }>({});
  const { id, name } = useParams<{ id: string; name: string }>();

  useEffect(() => {
    // Fetch attendance data for the current month and year
    console.log(
      "currentDate:",
      (currentDate.getMonth() + 1).toString().padStart(2, "0"),
      "-",
      currentDate.getFullYear()
    );
    fetch(
      `http://localhost:8080/api/DWR/attandancemanagement/attendance/${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${currentDate.getFullYear()}/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAttendanceData(data);
        console.log("attendance data:", data);
      })
      .catch((error) =>
        console.error("Error fetching attendance data:", error)
      );
  }, [currentDate, id]);

  const goToPreviousMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value);
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), month, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    setCurrentDate((prevDate) => new Date(year, prevDate.getMonth(), 1));
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const dayClass = "border border-gray-200 p-2 text-center";
  const sundayClass = "bg-blue-400";
  const saturdayClass = "bg-blue-400";
  const currentDateClass = "bg-yellow-300";
  const presentClass = "bg-green-400";
  const absentClass = "bg-red-600";
  const halfDayClass = "bg-purple-400";

  const is2ndOr4thSaturday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    const weekOfMonth = Math.ceil((day + firstDayOfMonth) / 7);
    return dayOfWeek === 6 && (weekOfMonth === 2 || weekOfMonth === 4);
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const getDayStatus = (day: number) => {
    const formattedDate = `${currentYear}-${currentMonth + 1 < 10 ? "0" : ""}${
      currentMonth + 1
    }-${day < 10 ? "0" : ""}${day}`;
    // console.log("attendanceData:", attendanceData);
    // console.log("formattedDate:", formattedDate);
    // console.log("status:" + attendanceData[formattedDate]);
    return attendanceData[formattedDate];
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
            const status = getDayStatus(day);
            // console.log("dateStatus:", status, " day:", day);
            const isCurrentDate =
              day === todaysDate.getDate() &&
              currentMonth === todaysDate.getMonth() &&
              currentYear === todaysDate.getFullYear();
            const isCurrentMonth = currentMonth === currentDate.getMonth();
            const isCurrentYear = currentYear === currentDate.getFullYear();
            const dayClassNames = [
              dayClass,
              new Date(currentYear, currentMonth, day).getDay() === 0
                ? sundayClass
                : "",
              new Date(currentYear, currentMonth, day).getDay() === 6
                ? is2ndOr4thSaturday(day)
                  ? saturdayClass
                  : ""
                : "",
              isCurrentDate && isCurrentMonth && isCurrentYear
                ? currentDateClass
                : "",
              status === "Present"
                ? presentClass
                : status === "Absent"
                ? absentClass
                : status === "Halfday"
                ? halfDayClass
                : "",
            ]
              .join(" ")
              .trim();
            console.log(status, "status");

            return status === "Present" || undefined ? (
              <div
                key={day}
                className={dayClassNames}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            ) : (
              <Tooltip key={day} title={`${status}`} arrow>
                <div
                  key={day}
                  className={dayClassNames}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>

      <div className="mt-4 w-full">
        <DateDetails currentDate={selectedDate} />
      </div>
      {/* </Tooltip> */}
    </div>
  );
};

export default AttendanceCalendar;
