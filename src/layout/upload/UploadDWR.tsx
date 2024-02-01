import React, { useState } from "react";
import axios from "axios";
import { employeeIdData } from "../../components/employee/Employee";

type Props = {
  data: employeeIdData;
};

const UploadDWR = (props: Props) => {
  const { data } = props;
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
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
      console.error("No file selected");
      alert("No file selected");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="border px-2 rounded-lg bg-green-300 border-green-700"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadDWR;
