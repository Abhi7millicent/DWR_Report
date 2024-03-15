import { useEffect, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import CommonTable from "../../layout/commonTable/CommonTable";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Tooltip from "@mui/material/Tooltip";

import {
  useGetAllRequestLeave,
  usePostApproveLeave,
  usePostRejectLeave,
} from "../../hook/querie/useLeaveMangement";
import toast, { Toaster } from "react-hot-toast";

interface requestedData {
  id: string;
  leaveType: string;
  description: string;
  startDate: string;
  endDate: string;
  noOfDays: string;
  status: string;
  balancedLeave: string;
  name: string;
  employeeId: {
    firstName: string;
    lastName: string;
  };
}

const Request = () => {
  const [data, setData] = useState<requestedData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  React query

  const { data: GetAllRequestLeaveData, refetch: GetAllRequestLeaveRefetch } =
    useGetAllRequestLeave();
  const { mutateAsync: PostApproveLeave } = usePostApproveLeave();
  const { mutateAsync: PostRejectLeave } = usePostRejectLeave();

  useEffect(() => {
    setData(GetAllRequestLeaveData?.data);
  }, [GetAllRequestLeaveData]);

  const approveLeave = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this leave?"
    );

    if (!confirmed) {
      return; // Do nothing if not confirmed
    }

    setLoading(true);

    try {
      const response = await PostApproveLeave(id);

      if (response) {
        toast.success("Leave approved successfully!", {
          position: "top-center",
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
          iconTheme: {
            primary: "var(--primary-color)",
            secondary: "#fff",
          },
        });
        GetAllRequestLeaveRefetch();
      }

      console.log("Leave approved for ID:", id);
      // Optionally, you can update the state or refetch the data here
    } catch (error) {
      console.error("Error approving leave:", error);
      toast.error("Error approving leave!!", {
        position: "top-center",
      });
      // setError("Error approving leave");
    } finally {
      setLoading(false);
    }
  };

  const rejectLeave = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this leave?"
    );
    if (!confirmed) {
      return; // Do nothing if not confirmed
    }
    setLoading(true);

    try {
      const response = await PostRejectLeave(id);

      if (response) {
        toast.success("Leave rejected!", {
          position: "top-center",
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
          iconTheme: {
            primary: "var(--primary-color)",
            secondary: "#fff",
          },
        });

        GetAllRequestLeaveRefetch();
      }

      // Optionally, you can update the state or refetch the data here
    } catch (error) {
      console.error("Error approving leave:", error);
      toast.error("Error reject leave!!", {
        position: "top-center",
      });
      // setError("Error approving leave");
    } finally {
      setLoading(false);
    }
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

  const tableBody = data?.map((appliedLeaveData, index) => [
    index + 1,
    `${appliedLeaveData.employeeId?.firstName ?? "-"} ${
      appliedLeaveData.employeeId?.lastName ?? "-"
    }`,
    appliedLeaveData.leaveType ? appliedLeaveData.leaveType : "-",
    appliedLeaveData.description ? appliedLeaveData.description : "-",
    appliedLeaveData.startDate ? appliedLeaveData.startDate : "-",
    appliedLeaveData.endDate ? appliedLeaveData.endDate : "-",
    appliedLeaveData.noOfDays ? appliedLeaveData.noOfDays : "-",
    appliedLeaveData.balancedLeave ? appliedLeaveData.balancedLeave : "-",
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
            <Toaster reverseOrder={false} />
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
