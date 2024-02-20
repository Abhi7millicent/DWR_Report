// import axios from "axios";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../../../layout/commonTable/CommonTable";
import EducationDetails from "./EducationDetails";
import axios from "axios";

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
      alert("Deleted sucessfully");
      console.log("Deleted educational detail with ID:", eduid);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting educational detail:", error);
    }
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No" },
    { accessorKey: "1", header: "Degree" },
    { accessorKey: "2", header: "Institute" },
    { accessorKey: "3", header: "Start Date" },
    { accessorKey: "4", header: "End Date" },
    { accessorKey: "5", header: "Percentage" },
    { accessorKey: "6", header: "Delete" },
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
      <DeleteIcon fontSize="small" className="text-red-600" />
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
              <button className="btn btn-background-color:hover">
                Add Education
              </button>
            </a>
          </div>
          <div className="mt-4">
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          <div className="w-fit">
            {/* <CommonModal isOpen={isModalOpen} onClose={closeModal}> */}
            <EducationDetails isOpen={isModalOpen} onClose={closeModal} />
            {/* </CommonModal> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEducationDetails;
