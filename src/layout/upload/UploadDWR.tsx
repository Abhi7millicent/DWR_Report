import React, { useState } from "react";
import axios from "axios";
import { employeeIdData } from "../../components/employee/Employee";
import { FaFileUpload } from "react-icons/fa"; // Import the File Upload icon from Font Awesome

type Props = {
  data: employeeIdData | null; // Adjusted to accept null
};

const UploadDWR = (props: Props) => {
  const { data } = props;
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file && data) {
      // Ensure both file and data are not null
      try {
        const formData = new FormData();
        formData.append("file", file);

        // Replace the URL with your actual API endpoint
        const apiUrl = `http://localhost:8080/api/DWR/employeeRecordData/import/${data.id}`;

        await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully");
        alert("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      }
    } else {
      console.error("No file selected or data missing");
      alert("No file selected or data missing");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  return (
    <div
      className={`border border-dashed p-4 ${
        dragging ? "bg-gray-200" : "bg-white"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label htmlFor="fileInput" className="cursor-pointer flex items-center">
        <FaFileUpload className="mr-2" />
        <span>Drag & Drop or Select File</span>
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      {file && <p className="mt-2">Selected File: {file.name}</p>}
      <button
        onClick={handleUpload}
        className="mt-4 border px-2 rounded-lg bg-green-300 border-green-700"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadDWR;
