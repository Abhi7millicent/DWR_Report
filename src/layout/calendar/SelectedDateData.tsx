import React, { useState, useEffect } from "react";
import UploadDWR from "../upload/UploadDWR";
import { useParams } from "react-router";

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

  useEffect(() => {
    if (id) {
      // Check if id is defined
      setEmpIdForUpload({ id });
    }
  }, [id]);

  return (
    <div className="mt-4">
      {startTime && (
        <div>
          <p className="bold">Start Time: {startTime}</p>
        </div>
      )}
      <div className="mt-4">
        <UploadDWR data={empIdForUpload} />
      </div>
      {endTime && (
        <div>
          <p className="bold">End Time: {endTime}</p>
        </div>
      )}
    </div>
  );
};

export default SelectedDateData;
