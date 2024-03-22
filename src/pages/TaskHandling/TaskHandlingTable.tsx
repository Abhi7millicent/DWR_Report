import { Button } from "@mui/material";
import { useState } from "react";
import CommonMaterialTable from "../../layout/commonTable/CommonTable";
import { Toaster } from "react-hot-toast";
import { MRT_ColumnDef } from "material-react-table";
import AddTask from "./AddTask";
import "./TaskHandling.css";
interface taskData {
  id: number;
  assign_Name: string;
  task_name: string;
  date: string;
  time: string;
  status: string;
}
function TaskHandlingTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [employeeData, setEmployeeData] = useState<empData[]>([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const tableHead: MRT_ColumnDef<any>[] = [
    {
      accessorKey: "0",
      header: "Sr.No",
      size: 15,
      visibleInShowHideMenu: true,
    },
    { accessorKey: "1", header: "Assign Name", size: 15 },
    { accessorKey: "2", header: "Task Name", size: 15 },
    { accessorKey: "3", header: "Date", size: 40 },
    { accessorKey: "4", header: "Time", size: 15 },
    { accessorKey: "5", header: "Status", size: 15 },

    // ... add the rest of your headers in a similar fashion
  ];

  const tableBody = data?.map((taskData, index) => [
    index + 1,
    taskData.assign_Name,
    taskData.task_name,
    taskData.date,
    taskData.time,
    <span className={`status-${taskData.status.toLowerCase()}`}>
      {taskData.status}
    </span>,
  ]);
  return (
    <div className="mt-4 mb-4 h-[calc(100vh-5rem)]">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full mb-4 ">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 px-4">Task List</h2>
            <div>
              <a onClick={openModal} className="px-4">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    "&.MuiButton-root": {
                      margin: "0px !important",
                    },
                  }}
                >
                  Add Task
                </Button>
              </a>
            </div>
          </div>
          <div className="p-4 ">
            <div>
              <CommonMaterialTable
                tableHead={tableHead}
                tableBody={tableBody}
              />
            </div>
          </div>
          <div className="w-fit">
            <Toaster reverseOrder={false} />
            <AddTask isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskHandlingTable;
const data: taskData[] = [
  {
    id: 1,
    assign_Name: "Madel",
    task_name: "Interview",
    date: "10/3/2023",
    time: "6:00 AM",
    status: "Available",
  },
  {
    id: 2,
    assign_Name: "Issiah",
    task_name: "Interview",
    date: "9/17/2023",
    time: "12:01 PM",
    status: "Pending",
  },
  {
    id: 3,
    assign_Name: "Glynnis",
    task_name: "Interview",
    date: "9/6/2023",
    time: "6:35 AM",
    status: "Process",
  },
  {
    id: 4,
    assign_Name: "Philomena",
    task_name: "Interview",
    date: "10/9/2023",
    time: "10:13 PM",
    status: "Pending",
  },
  {
    id: 5,
    assign_Name: "Jere",
    task_name: "Interview",
    date: "12/28/2023",
    time: "3:52 PM",
    status: "Available",
  },
  {
    id: 6,
    assign_Name: "King",
    task_name: "Interview",
    date: "7/19/2023",
    time: "2:32 AM",
    status: "Process",
  },
  {
    id: 7,
    assign_Name: "Gisela",
    task_name: "Interview",
    date: "5/11/2023",
    time: "10:26 PM",
    status: "Pending",
  },
  {
    id: 8,
    assign_Name: "Leif",
    task_name: "Interview",
    date: "5/22/2023",
    time: "7:04 AM",
    status: "Available",
  },
  {
    id: 9,
    assign_Name: "Valle",
    task_name: "Interview",
    date: "10/21/2023",
    time: "10:10 PM",
    status: "Pending",
  },
  {
    id: 10,
    assign_Name: "Dee dee",
    task_name: "Interview",
    date: "4/24/2023",
    time: "9:49 AM",
    status: "Pending",
  },
];
