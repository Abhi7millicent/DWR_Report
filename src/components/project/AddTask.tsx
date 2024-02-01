import React, { useEffect, useState } from "react";

interface AddTaskProps {
  data: {
    id: number;
    type: string;
    name: string;
    description: string;
    taskId: string;
    startDate: string;
    targetDate: string;
  };
}

const AddTask = (props: AddTaskProps) => {
  const [type, setType] = useState("");
  useEffect(() => {
    console.log("Type:", props.data.type);
    if (props.data.type === "Project") {
      setType("Task");
    } else if (props.data.type === "Task") {
      setType("SubTask");
    } else {
      setType(props.data.type + " |");
    }
  }, []);
  const [formData, setFormData] = useState({
    type: type,
    name: "",
    description: "",
    taskId: "",
    startDate: "",
    targetDate: "",
  });

  const startDate = props.data.startDate;
  const TargetDate = props.data.targetDate;
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // If the input is a date field, format it to "yyyy-mm-dd"
    if (name === "startDate" || name === "targetDate") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const requestData = {
      // your data structure here based on the API requirements
      type: type,
      name: formData.name,
      description: formData.description,
      taskId: formData.taskId,
      startDate: formData.startDate,
      targetDate: formData.targetDate,
    };

    try {
      console.log("ProjectData:", requestData);
      // Send POST request to the API
      const response = await fetch(
        `http://localhost:8080/api/DWR/project/save/${props.data.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        // Registration successful
        alert("Project Added successful!");
        // Additional actions if needed (e.g., redirect to another page)
      } else {
        // Registration failed
        alert("Project failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          <div className="w-1/3 p-4">
            <div className="relative">
              {/* <div className="absolute bottom-2 -left-5">
                  <PersonIcon />
                </div> */}
              <input
                type="text"
                id="name"
                name="name"
                className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                onChange={handleChange}
                placeholder="Name*"
                required
              />
              <label
                htmlFor="name"
                className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
              >
                Name*
              </label>
            </div>
          </div>

          <div className="w-1/3 p-4">
            <div className="relative">
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                placeholder="Start Date*"
                min={startDate}
                max={TargetDate}
                onChange={handleChange}
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
          <div className="w-1/3 p-4">
            <div className="relative">
              <input
                type="date"
                id="targetDate"
                name="targetDate"
                className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                placeholder="Target Date*"
                onChange={handleChange}
                min={formData.startDate} // Set min attribute to start date
                max={TargetDate}
                value={formData.targetDate}
                required
                disabled={!formData.startDate} // Disable if start date is not chosen
              />
              <label
                htmlFor="targetDate"
                className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
              >
                Target Date*
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-full p-4">
            <div className="relative">
              {/* <div className="absolute bottom-2 -left-5">
                  <PersonIcon />
                </div> */}
              <input
                type="text"
                id="description"
                name="description"
                className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                onChange={handleChange}
                placeholder="description*"
                required
              />
              <label
                htmlFor="description"
                className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
              >
                Description*
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 right-0"
        >
          ADD
        </button>
      </form>
    </div>
  );
};
export default AddTask;
