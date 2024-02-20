import { ReactNode, useState } from "react";
import { useParams } from "react-router";
import { useDropzone } from "react-dropzone"; // Import useDropzone
import UploadFileIcon from "@mui/icons-material/UploadFile";

type TQueryParam = {
  id: any;
};
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Documents: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center "
    : "hidden";
  const [selectedType, setSelectedType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { id } = useParams<TQueryParam>();
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

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

  return (
    <div className={`${modalClasses} z-10`}>
      <div className="flex items-center justify-center">
        {children}
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Add Documents</h2>
          <div className="flex flex-col">
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
            </div>
            {/* <div className="w-1/4 px-10 py-10">
                <button
                  onClick={handleSave}
                  disabled={
                    !selectedType || droppedFiles.length === 0 || !description
                  }
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Add
                </button>
              </div> */}
            <div className="flex justify-between ">
              <div>
                <button onClick={onClose} className="btn-close">
                  Close
                </button>
              </div>
              <div>
                <button
                  onClick={handleSave}
                  disabled={
                    !selectedType || droppedFiles.length === 0 || !description
                  }
                  className="btn"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
