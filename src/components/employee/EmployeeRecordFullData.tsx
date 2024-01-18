import axios from "axios";
import { MRT_ColumnDef } from "material-react-table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommonTable from "../../layout/commonTable/CommonTable";
import CloudDownloadSharpIcon from "@mui/icons-material/CloudDownloadSharp";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import DateRange from "../../layout/dateRange/DateRange";

interface empRecordsFullData {
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

const EmployeeRecordFullData: React.FC = () => {
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const { id } = useParams<{ id: string }>();
  const [employeeRecordsFullData, setEmployeeRecordsFullData] = useState<
    empRecordsFullData[]
  >([]);

  function formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/DWR/employeeRecordData/list/${id}`
        );

        setEmployeeRecordsFullData(response.data);
        console.log("data", response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching employee data:", error);
        }
      }
    };

    const source = axios.CancelToken.source();

    fetchData();

    return () => {
      source.cancel("Component is unmounting");
    };
  }, [id]);

  const DownloadData = async (format: "xlsx" | "pdf") => {
    try {
      let downloadUrl;

      if (format === "xlsx") {
        let response;
        if (formattedStartDate === "" && formattedStartDate === "") {
          response = await axios.get(
            `http://localhost:8080/api/DWR/employeeRecordData/download/${id}`,
            {
              responseType: "blob",
            }
          );
        } else {
          response = await axios.get(
            `http://localhost:8080/api/DWR/employeeRecordData/download/${id}/${formattedStartDate}/${formattedEndDate}`,
            {
              responseType: "blob",
            }
          );
        }

        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });

        downloadUrl = window.URL.createObjectURL(blob);
      } else if (format === "pdf") {
        const doc = new jsPDF();
        const tableData = employeeRecordsFullData.map((record) =>
          Object.values(record)
        );
        const tableHeaders = Object.keys(employeeRecordsFullData[0]);

        autoTable(doc, {
          head: [tableHeaders],
          body: tableData,
        });

        const blob = doc.output("blob");
        downloadUrl = URL.createObjectURL(blob);
      }

      const link = document.createElement("a");
      link.href = downloadUrl || "";
      link.download = `EmployeeRecords.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.error(`Error downloading ${format} data:`, error);

      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
      }
    }
  };

  const handleDateChange = (newDateRange: {
    startDate: Date;
    endDate: Date;
  }) => {
    const startDate = formatDateToString(newDateRange.startDate);
    const endDate = formatDateToString(newDateRange.endDate);
    setFormattedStartDate(formatDateToString(newDateRange.startDate));
    setFormattedEndDate(formatDateToString(newDateRange.endDate));
    const fetchDataBasedOnRange = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/DWR/employeeRecordData/list/${id}/${startDate}/${endDate}`
        );

        setEmployeeRecordsFullData(response.data);
        console.log("data", response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching employee data:", error);
        }
      }
    };

    fetchDataBasedOnRange();
  };

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

  const tableBody = employeeRecordsFullData.map((record, index) => [
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
      <div className="flex justify-between">
        <div className="text-3xl font-extrabold">
          <h2>DWR Report</h2>
        </div>
        <div className="cursor-pointer">
          <DateRange onDateChange={handleDateChange} />
        </div>
        <div className="text-3xl font-extrabold">
          <button onClick={() => DownloadData("xlsx")}>
            <CloudDownloadSharpIcon style={{ fontSize: 24 }} />{" "}
            <label className="text-sm">Excel</label>
          </button>
          <button onClick={() => DownloadData("pdf")} className="px-4">
            <FileDownloadIcon style={{ fontSize: 24 }} />{" "}
            <label className="text-sm">PDF</label>
          </button>
        </div>
      </div>
      <div className="mt-4 ">
        <CommonTable tableHead={tableHead} tableBody={tableBody} />
      </div>
    </div>
  );
};

export default EmployeeRecordFullData;
