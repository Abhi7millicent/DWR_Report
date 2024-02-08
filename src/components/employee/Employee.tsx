import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "../../layout/commonTable/CommonTable";
// import CommonSearchBar from "../../layout/commonSearchBar/CommonSearchBar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CommonModal from "../../layout/commonModal/CommonModal";
import Calendar from "../../layout/calendar/Calendar";
import { MRT_ColumnDef } from "material-react-table";
import ViewListSharpIcon from "@mui/icons-material/ViewListSharp";
import WysiwygSharpIcon from "@mui/icons-material/WysiwygSharp";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadDWR from "../../layout/upload/UploadDWR";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import Register from "../register/Register";

interface empData {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  date: string;
  reporting: string;
  role: string;
  loginId: string;
}

export interface employeeIdData {
  id: string;
}

const Employee: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empId, setEmpId] = useState<employeeIdData | null>(null);
  const [empIdForUpload, setEmpIdForUpload] = useState<employeeIdData | null>(
    null
  );
  const [employeeData, setEmployeeData] = useState<empData[]>([]);

  // const handleDataFromChild = async (data: string) => {
  //   console.log("Data received from child:", data);

  //   try {
  //     const response = await axios.get<empData[]>(
  //       `http://localhost:8080/api/DWR/list/${data}`
  //     );
  //     setEmployeeData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching employee data:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await axios.get<empData[]>(
        "http://localhost:8080/api/DWR/list"
      );
      setEmployeeData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the API

    fetchData();
  }, []); // Empty dependency array means the effect runs once when the component mounts

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModalForUpload = (Id: string) => {
    setIsModalOpen(true);
    setEmpIdForUpload({ id: Id }); // Corrected the way of setting empId
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmpId(null);
    setEmpIdForUpload(null);
    fetchData();
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No" },
    { accessorKey: "1", header: "Employee Id" },
    { accessorKey: "2", header: "Employee Name" },
    { accessorKey: "3", header: "Single View" },
    { accessorKey: "4", header: "Full View" },
    { accessorKey: "5", header: "Calendar" },
    { accessorKey: "6", header: "Upload" },
    // ... add the rest of your headers in a similar fashion
  ];

  // const tableHead = ["Sr.No", "Employee Name", "Record", "Calendar"];
  const tableBody = employeeData.map((empData, index) => [
    index + 1,
    empData.id,
    <a key={index} href={`/editEmployee/${empData.id}`}>
      {empData.firstName} {empData.lastName}
    </a>,
    <a
      key={index}
      href={`/employee_record/${empData.id}/${empData.firstName} ${empData.middleName} ${empData.lastName}`}
    >
      <ViewListSharpIcon />
    </a>,
    <a
      key={index}
      href={`/employee_record_data/${empData.id}/${empData.firstName} ${empData.middleName} ${empData.lastName}`}
    >
      <WysiwygSharpIcon />
    </a>,
    <a
      key={index}
      href={`/attendance/${empData.id}/${empData.firstName} ${empData.middleName} ${empData.lastName}`}
    >
      <CalendarMonthIcon />
    </a>,
    // <button key={index} onClick={() => openModal(empData.id.toString())}>
    //   <CalendarMonthIcon />
    // </button>,
    <a>
      <button
        key={index}
        onClick={() => openModalForUpload(empData.id.toString())}
      >
        <DriveFolderUploadIcon />
      </button>
    </a>,
  ]);

  return (
    <div className=" mt-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 px-4">Employee List</h2>
            <a onClick={openModal} className="px-4">
              <ControlPointRoundedIcon
                fontSize="large"
                className="text-green-600"
              />
            </a>
          </div>
          <div className="p-4">
            <div>
              <CommonTable tableHead={tableHead} tableBody={tableBody} />
            </div>
          </div>
          <div className="w-fit">
            <CommonModal isOpen={isModalOpen} onClose={closeModal}>
              {empId && <Calendar data={empId} />}
              {empIdForUpload && <UploadDWR data={empIdForUpload} />}
              {!empIdForUpload && <Register />}
            </CommonModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
