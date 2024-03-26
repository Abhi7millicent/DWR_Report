import React, { useState } from "react";

import { SetSessionItem } from "../../utils/SessionStorage";
import { useNavigate } from "react-router";
import "../../App.css";
import loginBackground from "../../assets/logo-color.png";
import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Icon from "../../components/fontAwesomeIcon/Icon";
import { usePostLogin } from "../../hook/querie/useLoginQueries";
import toast, { Toaster } from "react-hot-toast";

const Login: React.FC = () => {
  //------------------ Const -----------------//

  const navigate = useNavigate();

  //------------------ State -----------------//

  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //------------------ React query -----------------//
  const { mutateAsync: PostLogin } = usePostLogin();

  //------------------ Handle login submit -----------------//

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Validate inputs
    if (!userId) {
      setUserIdError("UserId is required.");
      setLoading(false);
      return;
    }

    if (!password) {
      setPasswordError("Password is required.");
      setLoading(false);
      return;
    }
    const loginUser = {
      // loginId: userId,
      email: userId,
      password: password,
    };
    try {
      // console.log("Login Credential:", response.data);
      const response = await PostLogin(loginUser);
      console.log(response);

      if (response.status === true) {
        SetSessionItem("status", response.status.toString());
        SetSessionItem("token", response.token);
        SetSessionItem("role", response.role);
        SetSessionItem("id", response.id);
        SetSessionItem("name", response.name);
        if (response.role === "Admin") {
          navigate("/employee");
        } else if (response.role === "Software Engineer") {
          navigate(`/attendance/${response.id}`);
        }
        setLoading(false);
      } else {
        console.log("Invalid credentials");
      }
    } catch (error: any) {
      toast.error("Invalid credentials!", {
        position: "top-center",
      });
      console.error("Error:", error.message);
    } finally {
      setLoading(false); // Reset loading state in both success and error cases
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen gap-4 overflow-x-hidden">
      <Toaster reverseOrder={false} />
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.6, repeatType: "loop" }}
      >
        <img className="w-40" src={loginBackground} alt="images" />
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ y: 300, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 shadow-md  rounded-md d-flex flex-col  sm:w-90 lg:w-1/3 "
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-color">
          Login
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="userId">
              UserId
            </label>
            <input
              type="text"
              id="userId"
              className={`w-full text-sm px-3 py-2 rounded-md input-border bg-white ${
                userIdError ? "border-red-500" : ""
              }`}
              placeholder="Enter your userId"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setUserIdError("");
              }}
            />
            {userIdError && (
              <p className="text-red-500 text-xs mt-1">{userIdError}</p>
            )}
          </div>
          <div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative mb-5">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full px-3 text-sm py-2 rounded-md input-border ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                />
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
                <div
                  className={`absolute  right-3 top-2  transform  cursor-pointer`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icons={showPassword ? [faEyeSlash] : [faEye]} />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            // style={{ backgroundColor: `${loading ? "red" : "blue"}` }}
            disabled={loading}
            className={`w-full text-white py-2 rounded-md ${
              loading ? "btn-disable-background-color" : "btn-background-color"
            } btn-background-color:hover transition-all input-border`}
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
