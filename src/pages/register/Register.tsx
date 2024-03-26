import { useState, ReactNode } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HttpsIcon from "@mui/icons-material/Https";
import SyncLockIcon from "@mui/icons-material/SyncLock";

import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { usePostEmployeeRegister } from "../../hook/querie/useEmployeeQueries";
import {
  useGetRoleEmployeeList,
  usePostRoleEmployeeList,
} from "../../hook/querie/useDropDown";
import { CiSquarePlus } from "react-icons/ci";
import CommonModal from "../../layout/commonModal/CommonModal";
import CommonSelectModel from "../../components/commonSelectModel/CommonSelectModel";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  refetchData: () => void;
}

const Register: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  refetchData,
}) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center "
    : "hidden";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "",
    reporting: "",
    password: "",
    confirmPassword: "",
  });
  // ---------------------------- React Query ------------------------//

  const { mutateAsync: PostEmployeeRegister } = usePostEmployeeRegister();
  const { mutateAsync: PostRoleEmployeeListMutateAsync } =
    usePostRoleEmployeeList();
  const { data: GetRoleEmployeeListData, refetch: GetRoleEmployeeListRefetch } =
    useGetRoleEmployeeList();

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
      toast.error("Password and Confirm Password must match!", {
        position: "top-center",
      });
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
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      // Send POST request to the API
      const response = await PostEmployeeRegister(requestData);

      if (response) {
        // Registration successful
        // alert("Registration successful!");
        toast.success("Employee Registration successful!", {
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
        refetchData();
        // navigate("/employee");
        onClose();
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          role: "",
          reporting: "",
          password: "",
          confirmPassword: "",
        });
        // Additional actions if needed (e.g., redirect to another page)
      } else {
        // Registration failed
        // alert("Registration failed. Please try again.");
        toast.error("Registration failed. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error: unknown) {
      // toast.error(error?.response?.data?.message, {
      //   position: "top-center",
      // });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      role: "",
      reporting: "",
      password: "",
      confirmPassword: "",
    });
    onClose();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={`${modalClasses} z-10`}>
      <div className="flex items-center  mt-3 justify-center">
        {children}
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
                    value={formData.firstName}
                    className="peer mt-1 p-2 w-full border-b border-[var(--primary-color)] text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent placeholder-shown:border-gray-300"
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
                    value={formData.middleName}
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
                    value={formData.lastName}
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
                    value={formData.email}
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
              <div className="w-1/3 p-4 flex justify-center align-middle">
                <div className="mt-3">
                  <EngineeringIcon />
                </div>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  className="peer mt-1 p-2 w-full border-b border-gray-300 text-gray-900 focus:outline-none focus:border-blue-400 placeholder-transparent"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled selected>
                    Select Role
                  </option>
                  {GetRoleEmployeeListData?.data?.map((item) => {
                    return <option value={item.name}>{item.name}</option>;
                  })}

                  {/* <option value="" disabled selected>
                    Select Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="softwareEngineer">Software Engineer</option> */}
                </select>

                <div className="mt-3 text-2xl cursor-pointer">
                  <CiSquarePlus onClick={openModal} />
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
                    value={formData.reporting}
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
            <div className="flex  mb-4">
              <div className="w-1/3 p-4">
                <div className="relative">
                  <div className="absolute bottom-2 -left-5">
                    <HttpsIcon />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
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
                    value={formData.confirmPassword}
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
            <div className="flex justify-between">
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
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </div>
          </form>
          <CommonModal isOpen={isModalOpen} onClose={closeModal}>
            <CommonSelectModel
              heading="Create Role"
              inputLabel="Add Role"
              buttonName="Create Role"
              closeModal={closeModal}
              postRequestApi={PostRoleEmployeeListMutateAsync}
              message="Role created successful!!"
              errorMessage="Role created failed !!"
              refetch={GetRoleEmployeeListRefetch}
            />
          </CommonModal>
        </div>
      </div>
    </div>
  );
};

export default Register;
