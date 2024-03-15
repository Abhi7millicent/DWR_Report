// import { useEffect, useState } from "react";
// // import DatePicker from "react-datepicker";
// import axios from "axios";
// import "react-datepicker/dist/react-datepicker.css";
// import CommonTable from "../../layout/commonTable/CommonTable";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import CommonModal from "../../layout/commonModal/CommonModal";
// import EmployeeRecordData from "./EmployeeRecordData";
// import { useParams } from "react-router";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import { MRT_ColumnDef } from "material-react-table";

// export interface empRecordData {
//   id: number;
//   employeeId: string;
//   date: string;
//   recived: string;
// }

// export interface modalData {
//   id: string;
//   date: string;
// }

// const EmployeeRecord = () => {
//   // const [startDate, setStartDate] = useState<Date | null>(null);
//   const [modaldata, setModadata] = useState<modalData | null>(null);
//   // const [endDate, setEndDate] = useState<Date | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { id, name } = useParams();
//   const [employeeRecordData, setEmployeeRecordData] = useState<empRecordData[]>(
//     []
//   );

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get<empRecordData[]>(
//           `http://localhost:8080/api/DWR/employeeRecord/list/${id}`
//         );
//         setEmployeeRecordData(response.data);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     fetchData();
//   }, [id]); // Empty dependency array means the effect runs once when the component mounts

//   // useEffect(() => {
//   //   console.log("Log: userid ", id);
//   // }, [id]);

//   const openModal = (Id: string, Date: string) => {
//     setModadata({
//       id: Id,
//       date: Date,
//     });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const tableHead: MRT_ColumnDef<any>[] = [
//     { accessorKey: "0", header: "Sr.No" },
//     { accessorKey: "1", header: "Date" },
//     { accessorKey: "2", header: "View Record" },
//     { accessorKey: "3", header: "Download" },
//     { accessorKey: "4", header: "Status" },
//   ];

//   // const tableHead = ["Sr.No", "Date", "View Record", "Download", "Status"];
//   const tableBody = employeeRecordData.map((record, index) => [
//     (index + 1).toString(),
//     record.date, // Assuming 'date' is the property you want to display
//     <button onClick={() => openModal(record.employeeId, record.date)}>
//       View
//     </button>,
//     <a href={`https://example.com/download/${record.id}/${record.date}`}>
//       <CloudDownloadIcon />
//     </a>,
//     <VerifiedIcon
//       className={record.recived === "YES" ? "text-green-500" : "text-red-500"}
//     />,
//   ]);
//   return (
//     <div className="p-4">
//       <div className="items-center text-3xl font-extrabold">
//         {/* <h2>DWR Daily Report Status</h2> */}
//       </div>
//       <div className="flex justify-between">
//         <div>
//           <label>
//             <b>Name:</b> {name}
//           </label>
//         </div>
//         {/* <div className="flex space-x-4">
//           <div className="flex space-x-4">
//             <label className="block text-sm font-medium text-gray-700">
//               <b>From</b>
//             </label>
//             <DatePicker
//               selected={startDate}
//               onChange={(date: Date | null) => setStartDate(date)}
//               dateFormat="MMMM d, yyyy"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <div className="flex space-x-4">
//             <label className="block text-sm font-medium text-gray-700">
//               <b>To</b>
//             </label>
//             <DatePicker
//               selected={endDate}
//               onChange={(date: Date | null) => setEndDate(date)}
//               dateFormat="MMMM d, yyyy"
//               startDate={startDate}
//               minDate={startDate}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//         </div> */}
//       </div>
//       <div className="mt-4">
//         <CommonTable tableHead={tableHead} tableBody={tableBody} />
//       </div>
//       {modaldata && (
//         <CommonModal isOpen={isModalOpen} onClose={closeModal}>
//           <EmployeeRecordData data={modaldata} />
//         </CommonModal>
//       )}
//     </div>
//   );
// };

// export default EmployeeRecord;

import React from "react";

const EmployeeRecord = () => {
  return <div></div>;
};

export default EmployeeRecord;
