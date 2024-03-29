import { MRT_ColumnDef } from "material-react-table";
import CommonMaterialTable from "../../../layout/commonTable/CommonTable";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "../editEmployeeDetails/SalarySlip.css";
import SalarySlipForm from "./SalarySlipForm";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../App/store";
import { useEffect, useState } from "react";

interface EmployeeData {
  firstName: string;
  lastName: string;
}
const SalarySlip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ------------------ Redux ---------------- //
  const { data } = useSelector((state: RootState) => state.appointmentLetter);

  // ------------------ state ---------------- //

  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 20 },
    { accessorKey: "1", header: "Month" },
    { accessorKey: "2", header: "Salary" },
    { accessorKey: "3", header: "Edit" },
    { accessorKey: "4", header: "Status" },
    { accessorKey: "5", header: "Download" },
  ];
  const tableBody = salarySlipData?.map((documentData, index) => [
    index + 1,
    documentData.month,
    documentData.salary,
    "Edit Button",
    <span className={`status-${documentData.status.toLowerCase()}`}>
      {documentData.status}
    </span>,

    <CloudDownloadIcon />,
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setEmployeeData(data as EmployeeData);
  }, [data]);
  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-2">Salary Slip</h2>
            <a onClick={openModal}>
              <Button variant="contained" color="primary">
                Add Salary Slip
              </Button>
            </a>
          </div>
          <p className="mb-3">
            Employee Name: {employeeData?.firstName} {employeeData?.lastName}
          </p>
          <div className="mt-4">
            <CommonMaterialTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          <div className="w-fit">
            <SalarySlipForm
              isOpen={isModalOpen}
              onClose={closeModal}
            ></SalarySlipForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlip;

const salarySlipData = [
  { month: "January", salary: 1000, status: "Approved" },
  { month: "February", salary: 1200, status: "Pending" },
];
