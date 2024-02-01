import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { useParams } from "react-router";

const EditDetails = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "",
    reporting: "",
    loginId: "",
    password: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/DWR/employee/${id}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setEmployeeData(data);
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const requestData = {
      firstName: employeeData.firstName,
      middleName: employeeData.middleName,
      lastName: employeeData.lastName,
      email: employeeData.email,
      role: employeeData.role,
      reporting: employeeData.reporting,
      loginId: employeeData.loginId,
      password: employeeData.password,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/DWR/employee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        alert("Employee details updated successfully!");
      } else {
        alert("Failed to update employee details. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Edit Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-4">
              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    <PersonIcon />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    onChange={handleChange}
                    placeholder="First Name*"
                    required
                    value={employeeData.firstName}
                  />
                  <label
                    htmlFor="firstName"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    First Name*
                  </label>
                </div>
              </div>

              <div className="w-1/3 p-4">
                <div className="relative">
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="Middle Name*"
                    onChange={handleChange}
                    required
                    value={employeeData.middleName}
                  />
                  <label
                    htmlFor="middleName"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Middle Name*
                  </label>
                </div>
              </div>

              <div className="w-1/3 p-4">
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="Last Name*"
                    onChange={handleChange}
                    required
                    value={employeeData.lastName}
                  />
                  <label
                    htmlFor="lastName"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Last Name*
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    <EmailIcon />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="Email*"
                    onChange={handleChange}
                    required
                    value={employeeData.email}
                  />
                  <label
                    htmlFor="email"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Email*
                  </label>
                </div>
              </div>

              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    <EngineeringIcon />
                  </div>
                  <select
                    id="role"
                    name="role"
                    className="peer mt-1 p-2 w-full border-b border-gray-300 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent"
                    onChange={handleChange}
                    required
                    value={employeeData.role}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="admin">Admin</option>
                    <option value="softwareEngineer">Software Engineer</option>
                  </select>
                  <label
                    htmlFor="role"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Role*
                  </label>
                </div>
              </div>

              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    <SupervisorAccountIcon />
                  </div>
                  <input
                    type="text"
                    id="reporting"
                    name="reporting"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="Reporting"
                    onChange={handleChange}
                    value={employeeData.reporting}
                  />
                  <label
                    htmlFor="reporting"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Reporting*
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    <ContactEmergencyIcon />
                  </div>
                  <input
                    type="text"
                    id="loginId"
                    name="loginId"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="UserId*"
                    onChange={handleChange}
                    required
                    value={employeeData.loginId}
                  />
                  <label
                    htmlFor="loginId"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Login Id*
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDetails;
