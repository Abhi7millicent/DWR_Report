import { useState } from "react";
import { useParams } from "react-router";
import { useDropzone } from "react-dropzone"; // Import useDropzone
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { usePostDocument } from "../../../hook/querie/useEmployeeDocument";

type TQueryParam = {
  id: any;
};
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  refechData: () => void;
}
const Documents: React.FC<ModalProps> = ({ isOpen, onClose, refechData }) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center "
    : "hidden";

  // State
  const [selectedType, setSelectedType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { id } = useParams<TQueryParam>();
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

  // React Query
  const { mutateAsync: PostDocument } = usePostDocument();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!selectedType || droppedFiles.length === 0 || !description) {
      return;
    }

    const formData = new FormData();
    formData.append("documentType", selectedType);
    formData.append("uploadFilePath", droppedFiles[0]); // Assuming only one file is allowed
    formData.append("description", description);
    formData.append("employeeId", id);
    // console.log(formData, "fromdat");

    try {
      const response = await PostDocument(formData);

      if (response) {
        console.log("Document saved successfully!");
        toast.success("Document saved successfully!", {
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
        // Optionally, you can reset the form fields or fetch updated data
        setSelectedType("");
        setDescription("");
        setDroppedFiles([]);
        refechData();
        onClose();
      } else {
        console.error("Failed to save document.");
        toast.error("Failed to save document.", {
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
        });
        // Handle error or display a message to the user
      }
    } catch (error) {
      console.error("An error occurred while saving the document:", error);
      // Handle error or display a message to the user
    }
  };
  const handleClose = () => {
    setSelectedType("");
    setDescription("");
    setDroppedFiles([]);
    onClose();
  };
  return (
    <div className={`${modalClasses} z-10`}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
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
                    <option value="Resume">Resume</option>
                    <option value="Cover Letter">Cover Letter</option>
                    <option value="Crtificate">Certificate</option>
                  </select>
                </div>
                <div className="mb-4 w-/4" {...getRootProps()}>
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
              <div className="flex justify-between ">
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff !important",
                    color: "var( --primary-color) !important",
                    border: "2px solid var( --primary-color) !important",
                  }}
                >
                  close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    !selectedType || droppedFiles.length === 0 || !description
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Documents;
