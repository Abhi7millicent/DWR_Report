// import React from "react";

import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import CommonTable from "../../layout/commonTable/CommonTable";
// import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
// import CommonModal from "../../layout/commonModal/CommonModal";

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
  // const [isModalOpen, setIsModalOpen] = useState(false);

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
      });
  }, []);
  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No" },
    { accessorKey: "1", header: "Name" },
    { accessorKey: "2", header: "Leave Type" },
    { accessorKey: "3", header: "Description" },
    { accessorKey: "4", header: "Start Date" },
    { accessorKey: "5", header: "End Date" },
    { accessorKey: "6", header: "No.Days" },
    { accessorKey: "7", header: "Balanced Leave" },
    { accessorKey: "8", header: "Status" },
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
  ]);
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   // fetchData();
  // };
  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Requested Leave</h2>
            {/* <a onClick={openModal}>
              <ControlPointRoundedIcon
                fontSize="large"
                className="text-green-600"
              />
            </a> */}
          </div>
          <div className="mt-4">
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          {/* <div className="w-fit">
            <CommonModal isOpen={isModalOpen} onClose={closeModal}>
            </CommonModal>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Request;
