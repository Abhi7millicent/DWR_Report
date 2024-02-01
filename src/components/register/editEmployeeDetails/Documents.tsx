import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../../../layout/commonTable/CommonTable";
import { useParams } from "react-router";
import { useDropzone } from "react-dropzone"; // Import useDropzone
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";

interface DocumentData {
  id: number;
  documentType: string;
  description: string;
  employeeId: string;
}

type TQueryParam = {
  id: any;
};

const Documents = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { id } = useParams<TQueryParam>();
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [data, setData] = useState<DocumentData[]>([]);
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
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
    fetchData();
  }, [id]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    maxFiles: 1,
    multiple: false,
    // accept: 'application/pdf, image/*', // Specify the accepted file types
    onDrop: (acceptedFiles) => {
      setDroppedFiles(acceptedFiles);
    },
  });

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!selectedType || droppedFiles.length === 0 || !description) {
      return;
    }

    const formData = new FormData();
    formData.append("documentType", selectedType);
    formData.append("file", droppedFiles[0]); // Assuming only one file is allowed
    formData.append("description", description);
    formData.append("employeeId", id);

    try {
      const response = await fetch(
        "http://localhost:8080/api/DWR/document/save",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      if (response) {
        alert("Document saved successfully!");
        console.log("Document saved successfully!");
        // Optionally, you can reset the form fields or fetch updated data
      } else {
        console.error("Failed to save document.");
        // Handle error or display a message to the user
      }
    } catch (error) {
      console.error("An error occurred while saving the document:", error);
      // Handle error or display a message to the user
    }
  };

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

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Add Documents</h2>
          <div>
            <div className="flex w-full gap-4">
              <div className="mb-4 w-1/4">
                <label className="block text-sm font-medium text-gray-600">
                  Document Type
                </label>
                <select
                  onChange={handleTypeChange}
                  value={selectedType}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Select Type</option>
                  <option value="resume">Resume</option>
                  <option value="coverLetter">Cover Letter</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>
              <div className="mb-4 w-1/4" {...getRootProps()}>
                <label className="block text-sm font-medium text-gray-600">
                  Upload File
                </label>
                <div className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                  <input {...getInputProps()} />
                  {droppedFiles.length > 0 ? (
                    <p>{droppedFiles.map((file) => file.name).join(", ")}</p>
                  ) : (
                    <p className="text-gray-400">
                      Drag 'n' drop some files here, or click to select files
                      <UploadFileIcon />
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4 w-1/4">
                <label className="block text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  onChange={handleDescriptionChange}
                  value={description}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                ></textarea>
              </div>
              <div className="w-1/4 px-10 py-10">
                <button
                  onClick={handleSave}
                  disabled={
                    !selectedType || droppedFiles.length === 0 || !description
                  }
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mt-4">
              <CommonTable tableHead={tableHead} tableBody={tableBody} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
