import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";

const EducationDetails = () => {
  const { id } = useParams();
  const [education, setEducation] = useState({
    employeeId: id,
    degree: "",
    institute: "",
    startDate: "",
    endDate: "",
    percentage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send data to the API using Axios
      const response = await axios.post(
        "http://localhost:8080/api/DWR/educationalDetails/save",
        education
      );
      console.error("Api response:", response.data);
      alert("Educational Details Inserted");

      // Optionally, you can handle the response or perform other actions after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Add Education Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-4">
              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    {/* <PersonIcon /> */}
                  </div>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    onChange={handleChange}
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="Degree*"
                    required
                  />
                  <label
                    htmlFor="degree"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Degree*
                  </label>
                </div>
              </div>

              <div className="w-1/3 p-4">
                <div className="relative">
                  <input
                    type="text"
                    id="institute"
                    name="institute"
                    onChange={handleChange}
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="Institute*"
                    required
                  />
                  <label
                    htmlFor="institute"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Institute*
                  </label>
                </div>
              </div>

              <div className="w-1/3 p-4">
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    onChange={handleChange}
                    placeholder="Start Date*"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    required
                  />
                  <label
                    htmlFor="startDate"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Start Date*
                  </label>
                </div>
              </div>
            </div>

            <div className="flex  mb-4">
              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    {/* <EmailIcon /> */}
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    onChange={handleChange}
                    placeholder="End Date*"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    required
                  />
                  <label
                    htmlFor="endDate"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    End Date*
                  </label>
                </div>
              </div>

              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    {/* <EngineeringIcon /> */}
                  </div>
                  <input
                    type="text"
                    id="percentage"
                    name="percentage"
                    onChange={handleChange}
                    placeholder="Percentage*"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    required
                  />
                  <label
                    htmlFor="percentage"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Percentage*
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
