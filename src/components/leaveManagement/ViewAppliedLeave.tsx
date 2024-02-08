import { MRT_ColumnDef } from "material-react-table";
import React, { useState } from "react";
import CommonTable from "../../layout/commonTable/CommonTable";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import CommonModal from "../../layout/commonModal/CommonModal";
import ApplyLeave from "./ApplyLeave";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No" },
    { accessorKey: "1", header: "Leave Type" },
    { accessorKey: "2", header: "Description" },
    { accessorKey: "3", header: "Start Date" },
    { accessorKey: "4", header: "End Date" },
    { accessorKey: "5", header: "No.Days" },
    { accessorKey: "6", header: "Status" },
  ];

  const tableBody = data.map((appliedLeaveData, index) => [
    index + 1,
    appliedLeaveData.leaveType,
    appliedLeaveData.description,
    appliedLeaveData.startDate,
    appliedLeaveData.endDate,
    appliedLeaveData.noOfDays,
    appliedLeaveData.status,
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    // fetchData();
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Applied Leave</h2>
            <a onClick={openModal}>
              <ControlPointRoundedIcon
                fontSize="large"
                className="text-green-600"
              />
            </a>
          </div>
          <div className="mt-4">
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          <div className="w-fit">
            <CommonModal isOpen={isModalOpen} onClose={closeModal}>
              <ApplyLeave />
            </CommonModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppliedLeave;
