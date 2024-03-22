import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonTable from "../../layout/commonTable/CommonTable";
// import CommonSearchBar from "../../layout/commonSearchBar/CommonSearchBar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import CommonModal from "../../layout/commonModal/CommonModal";
import Calendar from "../../layout/calendar/Calendar";
import { MRT_ColumnDef } from "material-react-table";
import ViewListSharpIcon from "@mui/icons-material/ViewListSharp";
import WysiwygSharpIcon from "@mui/icons-material/WysiwygSharp";

import UploadDWR from "../../layout/upload/UploadDWR";
// import Register  from "../register/Register";
import "../../App.css";
import Register from "../register/Register";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetEmployeeList,
  usePostEmployeeLeave,
} from "../../hook/querie/useEmployeeQueries";
import UploadAttendance from "./UploadAttendance";
import CommonModal from "../../layout/commonModal/CommonModal";
interface empData {
  id: string;
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
  const [isModalOpenUploadAttendance, setIsModalOpenUploadAttendance] =
    useState(false);
  const [empId, setEmpId] = useState<employeeIdData | null>(null);
  const [empIdForUpload, setEmpIdForUpload] = useState<employeeIdData | null>(
    null
  );

  const [employeeData, setEmployeeData] = useState<empData[]>([]);
  //React query
  const { data: GetEmployeeListData, refetch: GetEmployeeListDataRefetch } =
    useGetEmployeeList();

  const { mutateAsync: PostEmployeeLeave } = usePostEmployeeLeave();

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

  useEffect(() => {
    // Fetch data from the API

    setEmployeeData(GetEmployeeListData?.employees);
  }, [GetEmployeeListData]); // Empty dependency array means the effect runs once when the component mounts

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModalUploadAttendance = () => {
    setIsModalOpenUploadAttendance(true);
  };
  const closeModalUploadAttendance = () => {
    setIsModalOpenUploadAttendance(false);
  };
  const openModalForUpload = (Id: string) => {
    setIsModalOpen(true);
    setEmpIdForUpload({ id: Id }); // Corrected the way of setting empId
  };

  const addLeave = async () => {
    try {
      const response = await PostEmployeeLeave();

      // Show response in alert
      if (response) {
        toast.success("Leave Added", {
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
      }
      // alert(JSON.stringify(responseData));
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      // alert("An error occurred. Please try again later.");
      toast.success("Leave already added for the current month.", {
        position: "top-center",
        style: {
          fontFamily: "var( --font-family)",
        },
        iconTheme: {
          primary: "var(--primary-color)",
          secondary: "#fff",
        },
      });
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEmpId(null);
    setEmpIdForUpload(null);
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    {
      accessorKey: "0",
      header: "Sr.No",
      size: 15,
      visibleInShowHideMenu: true,
    },
    { accessorKey: "1", header: "Employee Id", size: 15 },
    { accessorKey: "2", header: "Employee Name", size: 40 },
    { accessorKey: "3", header: "Role", size: 40 },
    { accessorKey: "4", header: "Project Name", size: 40 },
    { accessorKey: "5", header: "Leave", size: 40 },
    { accessorKey: "6", header: "DWR View", size: 40 },
    // { accessorKey: "7", header: "Edit leave", size: 40 },
    // { accessorKey: "3", header: "Email", size: 15 },
    // { accessorKey: "4", header: "Full View", size: 15 },
    // { accessorKey: "5", header: "Calendar", size: 15 },
    // { accessorKey: "6", header:   "Upload", size: 15 },
    // ... add the rest of your headers in a similar fashion
  ];

  // const tableHead = ["Sr.No", "Employee Name", "Record", "Calendar"];
  const tableBody = employeeData?.map((empData, index) => [
    index + 1,
    empData.id,

    <a key={index} href={`/editEmployee/${empData.id}`}>
      {empData.firstName} {empData.lastName}
    </a>,
    empData.role,
    "CSE",
    "2",
    <a
      key={index}
      href={`/employee_record_data/${empData.id}/${empData.firstName} ${empData.middleName} ${empData.lastName}`}
    >
      <WysiwygSharpIcon />
    </a>,
    // <a
    //   key={index}
    //   href={`/attendance/${empData._id}/${empData.firstName} ${empData.middleName} ${empData.lastName}`}
    // >
    //   <CalendarMonthIcon />
    // </a>,
    // <button key={index} onClick={() => openModal(empData.id)}>
    //   <CalendarMonthIcon />
    // </button>,
    // <a>
    //   <button
    //     key={index}
    //     onClick={() => openModalForUpload(empData._id.toString())}
    //   >
    //     <DriveFolderUploadIcon />
    //   </button>
    // </a>,
  ]);

  return (
    <div className="mt-4 mb-4 h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full mb-4 ">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 px-4">Employee List</h2>
            <div>
              <Button
                variant="contained"
                color="primary"
                sx={{ margin: "5px !important" }} // Properly defining inline styles
                onClick={openModalUploadAttendance}
              >
                Upload attendance
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={addLeave}
                sx={{
                  "&.MuiButton-root": {
                    margin: "0px !important",
                  },
                }}
              >
                Add Leave
              </Button>
              <a className="px-4">
                {/* <ControlPointRoundedIcon className="text-color" /> */}
                {/* <button className="btn-background-color text-white py-2 rounded-md p-3"> */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    "&.MuiButton-root": {
                      margin: "0px !important",
                    },
                  }}
                  onClick={openModal}
                >
                  Add Employee
                </Button>
              </a>
            </div>
          </div>
          <div className="p-4 ">
            <div>
              <CommonTable tableHead={tableHead} tableBody={tableBody} />
            </div>
          </div>
          <div className="w-fit">
            <Toaster reverseOrder={false} />
            {!empIdForUpload && (
              <Register
                isOpen={isModalOpen}
                onClose={closeModal}
                refetchData={GetEmployeeListDataRefetch}
              >
                {empId && <Calendar data={empId} />}
                {empIdForUpload && <UploadDWR data={empIdForUpload} />}
                {/* {!empIdForUpload && (
                  <Register isOpen={isModalOpen} onClose={closeModal} />
                )} */}
              </Register>
            )}
          </div>
          <UploadAttendance
            isOpen={isModalOpenUploadAttendance}
            onClose={closeModalUploadAttendance}
          />
        </div>
      </div>
    </div>
  );
};

export default Employee;
