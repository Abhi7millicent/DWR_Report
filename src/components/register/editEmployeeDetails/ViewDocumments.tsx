import axios from "axios";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../../../layout/commonTable/CommonTable";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import CommonModal from "../../../layout/commonModal/CommonModal";
import Documents from "./Documents";

interface DocumentData {
  id: number;
  documentType: string;
  description: string;
  employeeId: string;
}

const ViewDocuments = () => {
  const { id } = useParams();
  const [data, setData] = useState<DocumentData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get<DocumentData[]>(
        `http://localhost:8080/api/DWR/document/list/${id}`
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

  const handleDeleteClick = (id: number) => {
    console.log(id);
    // Add logic to delete the document with the given id
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No" },
    { accessorKey: "1", header: "Document Type" },
    { accessorKey: "2", header: "Description" },
    { accessorKey: "3", header: "Download" },
    { accessorKey: "4", header: "Delete" },
  ];

  const tableBody = data.map((documentData, index) => [
    index + 1,
    documentData.documentType,
    documentData.description,
    <a
      key={`download-${index}`}
      href={`https://example.com/download/${documentData.id}`}
    >
      <CloudDownloadIcon />
    </a>,
    <a
      key={`delete-${index}`}
      onClick={() => handleDeleteClick(documentData.id)}
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
            <h2 className="text-2xl font-semibold mb-4">Documents</h2>
            <a onClick={openModal}>
              <ControlPointRoundedIcon
                fontSize="large"
                className="text-green-600"
              />
            </a>
          </div>
          <div className="mt-4">
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          <div className="w-fit">
            <CommonModal isOpen={isModalOpen} onClose={closeModal}>
              <Documents />
            </CommonModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDocuments;
