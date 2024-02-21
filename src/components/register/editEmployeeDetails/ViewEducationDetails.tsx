// import axios from "axios";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../../../layout/commonTable/CommonTable";
import EducationDetails from "./EducationDetails";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";

interface EducationalData {
  id: number;
  degree: string;
  institute: string;
  startDate: string;
  endDate: string;
  percentage: string;
}

const ViewEducationDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<EducationalData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get<EducationalData[]>(
        `http://localhost:8080/api/DWR/educationalDetails/list/${id}`
      );
      console.log("documentData:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteClick = async (eduid: number) => {
    try {
      await axios.put(
        `http://localhost:8080/api/DWR/educationalDetails/delete/${eduid}`
      );
      // alert("Deleted sucessfully");
      toast.success("Education deleted sucessfully", {
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
      console.log("Deleted educational detail with ID:", eduid);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting educational detail:", error);
    }
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 15 },
    { accessorKey: "1", header: "Degree", size: 30 },
    { accessorKey: "2", header: "Institute", size: 30 },
    { accessorKey: "3", header: "Start Date" },
    { accessorKey: "4", header: "End Date", size: 30 },
    { accessorKey: "5", header: "Percentage", size: 30 },
    { accessorKey: "6", header: "Delete", size: 30 },
  ];

  const tableBody = data.map((educationalData, index) => [
    index + 1,
    educationalData.degree,
    educationalData.institute,
    educationalData.startDate,
    educationalData.endDate,
    educationalData.percentage,
    <a
      key={`delete-${index}`}
      onClick={() => handleDeleteClick(educationalData.id)}
    >
      <DeleteIcon fontSize="small" className="text-red-600 cursor-pointer" />
    </a>,
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    fetchData();
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Educational Details</h2>
            <a onClick={openModal}>
              <Button variant="contained" color="primary">
                Add Education
              </Button>
            </a>
          </div>
          <div className="mt-4">
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          <div className="w-fit">
            {/* <CommonModal isOpen={isModalOpen} onClose={closeModal}> */}
            <Toaster position="top-center" reverseOrder={false} />
            <EducationDetails isOpen={isModalOpen} onClose={closeModal} />
            {/* </CommonModal> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEducationDetails;
