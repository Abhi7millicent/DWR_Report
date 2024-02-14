import React, { useState, useEffect } from "react";
import UploadDWR from "../upload/UploadDWR";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../App/store";

interface Data {
  id: number;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  dwrFlag: string;
  deleteflag: string;
  statusflag: string;
}

interface EmployeeIdData {
  id: string;
}

interface SelectedDateDataProps {
  startTime: string;
  endTime: string;
  selectedDate: string;
}

const SelectedDateData: React.FC<SelectedDateDataProps> = ({
  startTime,
  endTime,
  selectedDate,
}) => {
  const { id } = useParams<{ id?: string }>(); // Make id optional
  const [empIdForUpload, setEmpIdForUpload] = useState<EmployeeIdData | null>(
    null
  );
  const { data } = useSelector((state: RootState) => state.attendance);
  const [attendanceData, setAttendanceData] = useState<Data | null>(); // Corrected type to match your data structure
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [todaysDate, setTodaysDate] = useState("");

  useEffect(() => {
    console.log("attendanceData1:", data);
    if (data) {
      // console.log("attendanceData2:", data);
      setAttendanceData(data);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      setEmpIdForUpload({ id });
    }
    const currentDate1 = new Date();
    const year1 = currentDate1.getFullYear();
    const month1 = String(currentDate1.getMonth() + 1).padStart(2, "0");
    const day1 = String(currentDate1.getDate()).padStart(2, "0");
    const formattedDate1 = `${year1}-${month1}-${day1}`;
    setTodaysDate(formattedDate1);
  }, [id]);

  useEffect(() => {
    // console.log("attendanceData:", attendanceData);
    if (attendanceData && attendanceData?.statusflag) {
      setStatus(attendanceData.statusflag);
      setDate(attendanceData.date);
      // console.log("statusflag:", attendanceData.statusflag);
    }
  }, [attendanceData]);

  return (
    <div className="mt-4">
      {startTime && (
        <div>
          <p className="bold">Start Time: {startTime}</p>
        </div>
      )}
      {(status === "Absent" && date === selectedDate && (
        <div className="mt-4">
          <UploadDWR data={empIdForUpload} />
        </div>
      )) ||
        (selectedDate === todaysDate && (
          <div className="mt-4">
            <UploadDWR data={empIdForUpload} />
          </div>
        ))}
      {endTime && (
        <div>
          <p className="bold">End Time: {endTime}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedDateData;
