import React, { useState } from "react";

import { employeeIdData } from "../../components/employee/Employee";
import { CloudUploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { usePostDWR } from "../../hook/querie/useDWR";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";

type Props = {
  data: employeeIdData | null; // Adjusted to accept null
};

const UploadDWR = (props: Props) => {
  const { data } = props;
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const { id } = useParams();

  const { mutateAsync: PostDWRData } = usePostDWR();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      // Ensure both file and data are not null
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await PostDWRData(formData);

        if (response) {
          toast.success("DWR uploaded successfully!", {
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
        }
      } catch (error) {
        toast.error("Error uploading file", {
          position: "top-center",
        });
      }
    } else {
      toast.error("No file selected or data missing", {
        position: "top-center",
      });
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
      <Toaster reverseOrder={false} />
      <label htmlFor="fileInput" className="cursor-pointer flex items-center">
        <div>
          <CloudUploadOutlined className="mr-2" color="black" />
        </div>
        <span>Drag & Drop or Select File</span>
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      {file && <p className="mt-2">Selected File: {file.name}</p>}

      <Button onClick={handleUpload} variant="contained" color="primary">
        Upload
      </Button>
    </div>
  );
};

export default UploadDWR;
