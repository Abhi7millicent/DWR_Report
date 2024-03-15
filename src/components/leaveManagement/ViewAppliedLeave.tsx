import { MRT_ColumnDef } from "material-react-table";
import { useState, useEffect } from "react";
import CommonTable from "../../layout/commonTable/CommonTable";

import ApplyLeave from "./ApplyLeave";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { GetSessionItem } from "../../utils/SessionStorage";
import {
  useGetBalancedLeave,
  useGetLeaveMangement,
} from "../../hook/querie/useLeaveMangement";

import "./applyLeave.css";

interface appliedleaveData {
  id: number;
  leaveType: string;
  description: string;
  startDate: string;
  endDate: string;
  noOfDays: string;
  status: string;
}

const ViewAppliedLeave = () => {
  const [data, setData] = useState<appliedleaveData[]>([]);
  const [balancedLeave, setBalancedLeave] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { idp } = useParams();

  let id = GetSessionItem("id");
  const { data: GetLeaveMangementData, refetch: GetLeaveMangementDataRefetch } =
    useGetLeaveMangement(String(id));
  const { data: GetBalancedLeaveData } = useGetBalancedLeave(String(id));

  if (id === idp) {
    id = idp;
  }

  useEffect(() => {
    setBalancedLeave(GetBalancedLeaveData?.data);
    setData(GetLeaveMangementData?.data);
  }, [GetLeaveMangementData, GetBalancedLeaveData]); // Fetch data whenever id changes

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 10 },
    { accessorKey: "1", header: "Leave Type", size: 20 },
    { accessorKey: "2", header: "Description" },
    { accessorKey: "3", header: "Start Date", size: 15 },
    { accessorKey: "4", header: "End Date", size: 20 },
    { accessorKey: "5", header: "No.Days", size: 20 },
    { accessorKey: "6", header: "Status" },
  ];

  const tableBody = data?.map((appliedLeaveData, index) => [
    index + 1,
    appliedLeaveData.leaveType,
    appliedLeaveData.description,
    appliedLeaveData.startDate,
    appliedLeaveData.endDate,
    appliedLeaveData.noOfDays,
    <span className={`status-${appliedLeaveData.status.toLowerCase()}`}>
      {appliedLeaveData.status}
    </span>,
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-1xl font-semibold mb-4">Apply Leave</h2>
            <Button variant="contained" color="primary" onClick={openModal}>
              Add Leave
            </Button>
          </div>
          <div>
            <p>Balanced Leave: {balancedLeave}</p>
          </div>
          <div className="mt-4">
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          <div className="w-fit">
            <Toaster reverseOrder={false} />
            {/* <CommonModal isOpen={isModalOpen} onClose={closeModal}> */}
            <ApplyLeave
              balanced={balancedLeave}
              isOpen={isModalOpen}
              onClose={closeModal}
              refetchData={GetLeaveMangementDataRefetch}
            />
            {/* </CommonModal> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppliedLeave;
