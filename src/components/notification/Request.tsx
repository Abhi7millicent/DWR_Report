import { useEffect, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import CommonTable from "../../layout/commonTable/CommonTable";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

interface requestedData {
  id: number;
  leaveType: string;
  description: string;
  startDate: string;
  endDate: string;
  noOfDays: string;
  status: string;
  balancedLeave: string;
  name: string;
}

const Request = () => {
  const [data, setData] = useState<requestedData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/DWR/leavemanagement/requestedLeave")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData: requestedData[]) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      });
  }, [loading]);

  const approveLeave = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this leave?"
    );
    if (!confirmed) {
      return; // Do nothing if not confirmed
    }

    setLoading(true);
    axios
      .post(`http://localhost:8080/api/DWR/leavemanagement/approve/${id}`)
      .then(() => {
        console.log("Leave approved for ID:", id);
        // Optionally, you can update the state or refetch the data here
      })
      .catch((error) => {
        console.error("Error approving leave:", error);
        setError("Error approving leave");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const rejectLeave = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this leave?"
    );
    if (!confirmed) {
      return; // Do nothing if not confirmed
    }
    setLoading(true);
    axios
      .post(`http://localhost:8080/api/DWR/leavemanagement/reject/${id}`)
      .then(() => {
        console.log("Leave rejected for ID:", id);
        // Optionally, you can update the state or refetch the data here
      })
      .catch((error) => {
        console.error("Error rejecting leave:", error);
        setError("Error rejecting leave");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 20 },
    { accessorKey: "1", header: "Name" },
    { accessorKey: "2", header: "Leave Type" },
    { accessorKey: "3", header: "Description" },
    { accessorKey: "4", header: "Start Date" },
    { accessorKey: "5", header: "End Date" },
    { accessorKey: "6", header: "No.Days" },
    { accessorKey: "7", header: "Balanced Leave" },
    { accessorKey: "8", header: "Status" },
    { accessorKey: "9", header: "Actions" }, // Action column
  ];

  const tableBody = data.map((appliedLeaveData, index) => [
    index + 1,
    appliedLeaveData.name,
    appliedLeaveData.leaveType,
    appliedLeaveData.description,
    appliedLeaveData.startDate,
    appliedLeaveData.endDate,
    appliedLeaveData.noOfDays,
    appliedLeaveData.balancedLeave,
    appliedLeaveData.status,
    // Action buttons for each leave request
    <div>
      {appliedLeaveData.status !== "Approved" && (
        <Tooltip title="Approve">
          <button onClick={() => approveLeave(appliedLeaveData.id)}>
            <ThumbUpAltIcon style={{ color: "green" }} />
          </button>
        </Tooltip>
      )}
      {appliedLeaveData.status !== "Rejected" && (
        <Tooltip title="Reject">
          <button onClick={() => rejectLeave(appliedLeaveData.id)}>
            <ThumbDownAltIcon style={{ color: "red" }} />
          </button>
        </Tooltip>
      )}
    </div>,
  ]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Requested Leave</h2>
          </div>
          <div className="mt-4">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <CommonTable tableHead={tableHead} tableBody={tableBody} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
