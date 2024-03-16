import { useEffect, useState } from "react";
import CommonTable from "../../layout/commonTable/CommonTable";
import axios from "axios";
// import { modalData } from "./EmployeeRecord";
import { MRT_ColumnDef } from "material-react-table";

export interface empRecordsData {
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
  // data: modalData;
  data: any;
};

const EmployeeRecordData = (props: Props) => {
  const { data } = props;

  useEffect(() => {
    console.log("Log: userid ", data.id, "date", data.date);
  }, [data.id]);

  const [employeeRecordsData, setEmployeeRecordsData] = useState<
    empRecordsData[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/DWR/employeeRecordData/list/${data.id}/${data.date}`
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
  }, [data.id, data.date]);

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
    <div className="p-4">
      <div className="mt-4">
        <CommonTable tableHead={tableHead} tableBody={tableBody} />
      </div>
    </div>
  );
};

export default EmployeeRecordData;
