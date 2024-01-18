// Import necessary libraries
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSunday } from "date-fns"; // Import date-fns functions
import CommonModal from "../commonModal/CommonModal";
import CommonTable from "../commonTable/CommonTable";
import axios from "axios";
import { employeeIdData } from "../../components/employee/Employee";
import { MRT_ColumnDef } from "material-react-table";

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

type Props = {
  data: employeeIdData;
};
// Define the Calendar component
const Calendar = (props: Props) => {
  // State to track the selected date
  const { data } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle date selection
  const handleDateChange = (date: Date | null) => {
    console.log("selected Date:", date);
    if (date) {
      const inputDate = new Date(date);
      inputDate.setDate(inputDate.getDate() + 1);
      console.log("mid Date:", inputDate);
      const formattedDate = inputDate.toISOString().split("T")[0];
      setShowDate(formattedDate);
      openModal();
      // You can perform additional actions on date selection if needed
      console.log("formated Date:", formattedDate);
    }
    console.log("selected day:", setSelectedDate);
  };
  // Function to customize the rendering of date cells
  const highlightWeekendDays = (date: Date) => {
    const day = date.getDate();
    const weekNumber = Math.ceil(day / 7);

    if (isSunday(date)) {
      return "text-gray-500 bg-gray-200"; // Customize with your desired styles
    }

    function isSaturday(date: Date): boolean {
      return date.getDay() === 6; // 6 corresponds to Saturday
    }

    if (isSaturday(date) && (weekNumber === 2 || weekNumber === 4)) {
      return "text-gray-500 bg-gray-200"; // Customize with your desired styles
    }

    // Default styling for other days
    return "";
  };

  const [employeeRecordsData, setEmployeeRecordsData] = useState<
    empRecordsData[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Id:", data.id, " date:", showDate);
        const response = await axios.get(
          `http://localhost:8080/api/DWR/employeeRecordData/list/${data.id}/${showDate}`
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
  }, [showDate]);

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No" },
    { accessorKey: "1", header: "Emp Id" },
    { accessorKey: "2", header: "Date" },
    { accessorKey: "3", header: "From Time" },
    { accessorKey: "4", header: "To Time" },
    { accessorKey: "5", header: "Project Name" },
    { accessorKey: "6", header: "Issue/Support/TaskDescription" },
    { accessorKey: "7", header: "Reported By/Allocated by" },
    { accessorKey: "8", header: "Bug/New/Change/Support" },
    { accessorKey: "9", header: "Resolved On/Completed On" },
    { accessorKey: "10", header: "Comment Solution" },
  ];

  const tableBody = employeeRecordsData.map((record, index) => [
    (index + 1).toString(),
    record.employeeId,
    record.date,
    record.fromTime,
    record.toTime,
    record.projectName,
    record.taskDiscription,
    record.reportedBy,
    record.ticketType,
    record.status,
    record.solution,
  ]);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline // Display the calendar inline
        dayClassName={highlightWeekendDays} // Apply custom styles to date cells
      />
      <div className="z-80">
        <CommonModal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
        </CommonModal>
      </div>
    </div>
  );
};

// Export the Calendar component
export default Calendar;
