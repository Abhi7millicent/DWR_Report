import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import HttpsIcon from "@mui/icons-material/Https";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import { useNavigate } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "",
    reporting: "",
    loginId: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate password and conform password
    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password must match!");
      return;
    }

    // Prepare data for API request
    const requestData = {
      // your data structure here based on the API requirements
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
      reporting: formData.reporting,
      loginId: formData.loginId,
      password: formData.password,
    };

    try {
      console.log("Data:", requestData);
      // Send POST request to the API
      const response = await fetch("http://localhost:8080/api/DWR/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Registration successful
        // alert("Registration successful!");
        navigate("/employee");
        // Additional actions if needed (e.g., redirect to another page)
      } else {
        // Registration failed
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Registration</h2>
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
                  >
                    <option value="" disabled selected>
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
                  />
                  <label
                    htmlFor="loginId"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Login Id*
                  </label>
                </div>
              </div>
              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    <HttpsIcon />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="Password*"
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="absolute  bottom-2 right-0 cursor-pointer peer-placeholder-shown:hidden"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                  <label
                    htmlFor="password"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Password*
                  </label>
                </div>
              </div>
              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    <SyncLockIcon />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="peer mt-1 p-2 w-full border-b border-blue-400 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
                    placeholder="Confirm Password*"
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="absolute  bottom-2 right-0 cursor-pointer peer-placeholder-shown:hidden"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </div>
                  <label
                    htmlFor="confirmPassword"
                    className="mt-1 p-2 w-full absolute left-0 -top-4 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-0.5 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-black"
                  >
                    Confirm Password*
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
