import React, { useEffect, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import CommonTable from "../commonTable/CommonTable";
import axios from "axios";
import { useParams } from "react-router";
import SelectedDateData from "./SelectedDateData";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BorderColor from "@mui/icons-material/BorderColor";

interface empRecordsData {
  id: number;
  employeeId: string;
  date: string;
  fromTime: string;
  toTime: string;
  projectName: string;
  taskDiscription: string;
  reportedBy: string;
  ticketType: string;
  status: string;
  solution: string;
}

interface DateDetailsProps {
  currentDate: Date; // Add this line to receive employee records data
}

const DateDetails: React.FC<DateDetailsProps> = ({ currentDate }) => {
  const { id } = useParams();
  const [employeeRecordsData, setEmployeeRecordsData] = useState<
    empRecordsData[]
  >([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isStart, setIsStart] = useState(true); // State to track start/end
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const inputDate = new Date(currentDate);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based index
    const day = String(inputDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
  }, [currentDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/DWR/employeeRecordData/list/${id}/${selectedDate}`
        );

        setEmployeeRecordsData(response.data);
        console.log("data", response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          // Request was canceled
          console.log("Request canceled:", error.message);
        } else {
          // Handle other errors
          console.error("Error fetching employee data:");
        }
      }
    };

    const source = axios.CancelToken.source();

    fetchData();

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      source.cancel("Component is unmounting");
    };
  }, [id, selectedDate]);

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No" },
    { accessorKey: "1", header: "From Time" },
    { accessorKey: "2", header: "To Time" },
    { accessorKey: "3", header: "Project Name" },
    { accessorKey: "4", header: "Issue/Support/TaskDescription" },
    { accessorKey: "5", header: "Reported By/Allocated by" },
    { accessorKey: "6", header: "Bug/New/Change/Support" },
    { accessorKey: "7", header: "Resolved On/Completed On" },
    { accessorKey: "8", header: "Comment Solution" },
  ];

  const tableBody = employeeRecordsData.map((record, index) => ({
    "0": (index + 1).toString(),
    "1": record.fromTime,
    "2": record.toTime,
    "3": record.projectName,
    "4": record.taskDiscription,
    "5": record.reportedBy,
    "6": record.ticketType,
    "7": record.status,
    "8": record.solution,
  }));

  const handleToggleStart = (e: any) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "Are you sure you want to Start the day?"
    );
    if (confirmation) {
      const currentTime = new Date().toLocaleTimeString();
      console.log("Start time:", currentTime);
      setStartTime(currentTime);
      setIsStart(!isStart);
    }
  };

  const handleToggleEnd = (e: any) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "Are you sure you want to End the day?"
    );
    if (confirmation) {
      const currentTime = new Date().toLocaleTimeString();
      console.log("End time:", currentTime);
      setEndTime(currentTime);
      setIsStart(!isStart);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md max-w-screen-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">
              {currentDate.toDateString()}
            </h2>
            <div>
              {/* Toggle button for start/end */}
              {isStart ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg"
                  onClick={handleToggleStart}
                >
                  Start
                </button>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg"
                  onClick={handleToggleEnd}
                >
                  End
                </button>
              )}
            </div>
          </div>

          <div className="py-4">
            <Tabs>
              <TabList
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <Tab>Selected Date Data</Tab>
                <Tab>Employee Records Table</Tab>
              </TabList>
              <TabPanel>
                <SelectedDateData startTime={startTime} endTime={endTime} />
              </TabPanel>
              <TabPanel>
                <CommonTable tableHead={tableHead} tableBody={tableBody} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateDetails;
