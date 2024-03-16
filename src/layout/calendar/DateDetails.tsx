import React, { useEffect, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import CommonTable from "../commonTable/CommonTable";
import axios from "axios";
import { useParams } from "react-router";
import SelectedDateData from "./SelectedDateData";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import ViewAppliedLeave from "../../components/leaveManagement/ViewAppliedLeave";
// import BorderColor from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/store";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "../../features/attendanceSlice";
import { useGetDWRListBaseOnDate } from "../../hook/querie/useDWR";

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
  const [todaysDate, setTodaysDate] = useState("");
  const [isStart, setIsStart] = useState(true); // State to track start/end
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.attendance);

  useEffect(() => {
    const inputDate = new Date(currentDate);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based index
    const day = String(inputDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);

    const currentDate1 = new Date();
    const year1 = currentDate1.getFullYear();
    const month1 = String(currentDate1.getMonth() + 1).padStart(2, "0");
    const day1 = String(currentDate1.getDate()).padStart(2, "0");
    const formattedDate1 = `${year1}-${month1}-${day1}`;
    setTodaysDate(formattedDate1);
  }, [currentDate]);

  // -------------------- React query  ------------------//
  const { data: GetDWRListData } = useGetDWRListBaseOnDate(
    String(id),
    selectedDate
  );
  const fetchSelectedDateData = async () => {
    dispatch(fetchDataStart());
    try {
      const response = await axios.get(
        `http://localhost:8080/api/DWR/attandancemanagement/data/${id}/${selectedDate}`
      );
      console.log("data", response.data);
      setStartTime(response.data.startTime);
      setEndTime(response.data.endTime);
      console.log("startTime:", response.data.startTime);
      dispatch(fetchDataSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
      if (axios.isCancel(error)) {
        // Request was canceled
        console.log("Request canceled:", error.message);
      } else {
        // Handle other errors
        console.error("Error fetching attendance data:");
        setStartTime("");
        setEndTime("");
      }
    }
  };

  useEffect(() => {
    console.log("redux:", data);
  }, [data]);

  // useEffect(() => {
  //   fetchSelectedDateData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/api/DWR/employeeRecordData/list/${id}/${selectedDate}`
  //       );

  //       setEmployeeRecordsData(response.data);
  //       console.log("data", response.data);
  //     } catch (error) {
  //       if (axios.isCancel(error)) {
  //         // Request was canceled
  //         console.log("Request canceled:", error.message);
  //       } else {
  //         // Handle other errors
  //         console.error("Error fetching employee data:");
  //       }
  //     }
  //   };

  //   const source = axios.CancelToken.source();

  //   fetchData();
  //   fetchSelectedDateData();
  //   // Cleanup function to cancel the request if the component unmounts
  //   return () => {
  //     source.cancel("Component is unmounting");
  //   };
  // }, [id, selectedDate]);

  useEffect(() => {
    setEmployeeRecordsData(GetDWRListData?.data);
  }, [GetDWRListData]);

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 20 },
    { accessorKey: "1", header: "From Time", size: 50 },
    { accessorKey: "2", header: "To Time", size: 50 },
    { accessorKey: "3", header: "Project Name", size: 50 },
    { accessorKey: "4", header: "Issue/Support/TaskDescription", size: 50 },
    { accessorKey: "5", header: "Reported By/Allocated by", size: 50 },
    { accessorKey: "6", header: "Bug/New/Change/Support", size: 50 },
    { accessorKey: "7", header: "Resolved On/Completed On", size: 50 },
    { accessorKey: "8", header: "Comment Solution" },
  ];

  const tableBody = employeeRecordsData?.map((record, index) => ({
    "0": (index + 1).toString(),
    "1": record.fromTime || "-",
    "2": record.toTime || "-",
    "3": record.projectName || "-",
    "4": record.taskDiscription || "-",
    "5": record.reportedBy || "-",
    "6": record.ticketType || "-",
    "7": record.status || "-",
    "8": record.solution || "-",
  }));

  const handleToggleStart = async (e: any) => {
    e.preventDefault();
    try {
      const confirmation = window.confirm(
        "Are you sure you want to start the day?"
      );
      if (confirmation) {
        const currentTime = new Date().toLocaleTimeString();
        console.log("Start time:", currentTime);
        setIsStart(!isStart);

        const response = await axios.post(
          `http://localhost:8080/api/DWR/attandancemanagement/save/${id}`,
          {
            date: selectedDate,
            startTime: currentTime,
          }
        );

        console.log("Attendance started successfully!", response.data);
        fetchSelectedDateData();
        // Handle response if needed
      } else {
        console.log("Attendance start cancelled.");
        // Handle cancellation if needed
      }
    } catch (error) {
      console.error("Error starting attendance:", error);
      // Handle errors as needed
    }
  };

  const handleToggleEnd = async (e: any) => {
    e.preventDefault();
    try {
      const confirmation = window.confirm(
        "Are you sure you want to End the day?"
      );
      if (confirmation) {
        const currentTime = new Date().toLocaleTimeString();
        console.log("End time:", currentTime);
        setIsStart(!isStart);

        const response = await axios.put(
          `http://localhost:8080/api/DWR/attandancemanagement/update/${id}`,
          {
            date: selectedDate,
            endTime: currentTime,
          }
        );

        console.log("Attendance updated successfully!", response.data);
        fetchSelectedDateData();
      } else {
        console.log("Attendance updated cancelled.");
        // Handle cancellation if needed
      }
    } catch (error) {
      console.error("Error updated attendance:", error);
      // Handle errors as needed
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
            {/* <div>

              {isStart && selectedDate === todaysDate && !startTime && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg"
                  onClick={handleToggleStart}
                >
                  Start
                </button>
              )}
              {startTime && selectedDate === todaysDate && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg"
                  onClick={handleToggleEnd}
                >
                  End
                </button>
              )}
            </div> */}
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
                {/* <Tab>Apply Leave</Tab> */}
              </TabList>
              <TabPanel>
                <SelectedDateData
                  startTime={startTime}
                  endTime={endTime}
                  selectedDate={selectedDate}
                />
              </TabPanel>
              <TabPanel>
                <CommonTable tableHead={tableHead} tableBody={tableBody} />
              </TabPanel>
              <TabPanel>{/* <ViewAppliedLeave /> */}</TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateDetails;
