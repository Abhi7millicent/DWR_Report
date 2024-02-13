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
}

const SelectedDateData: React.FC<SelectedDateDataProps> = ({
  startTime,
  endTime,
}) => {
  const { id } = useParams<{ id?: string }>(); // Make id optional
  const [empIdForUpload, setEmpIdForUpload] = useState<EmployeeIdData | null>(
    null
  );
  const { data } = useSelector((state: RootState) => state.attendance);
  const [attendanceData, setAttendanceData] = useState<Data[] | null>(null); // Corrected type to match your data structure

  useEffect(() => {
    console.log("attendanceData1:", data);
    if (data) {
      console.log("attendanceData2:", data);
      setAttendanceData(data);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      setEmpIdForUpload({ id });
    }
  }, [id]);

  useEffect(() => {
    console.log("attendanceData3:", attendanceData);
  }, [attendanceData]);
  return (
    <div className="mt-4">
      {startTime && (
        <div>
          <p className="bold">Start Time: {startTime}</p>
        </div>
      )}
      {/* {startTime && ( */}
      <div className="mt-4">
        <UploadDWR data={empIdForUpload} />
      </div>
      {/* )} */}
      {endTime && (
        <div>
          <p className="bold">End Time: {endTime}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedDateData;
