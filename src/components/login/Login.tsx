import React, { useState } from "react";
import axios from "axios";
import { SetSessionItem } from "../../utils/SessionStorage";
import { useNavigate } from "react-router";
import "../../App.css";
import loginBackground from "../../assets/logo-color.png";
import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Icon from "../fontAwesomeIcon/Icon";
const Login: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate inputs
    if (!userId) {
      setUserIdError("UserId is required.");
      return;
    }

    if (!password) {
      setPasswordError("Password is required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/DWR/login", {
        loginId: userId,
        password: password,
      });
      console.log("Login Credential:", response.data);
      const status = response.data.status;

      if (status === true) {
        SetSessionItem("status", response.data.status.toString());
        SetSessionItem("token", response.data.token);
        SetSessionItem("role", response.data.role);
        navigate("/employee");
        setLoading(true);
      } else {
        console.log("Invalid credentials");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen gap-4">
      <motion.span
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.6, repeatType: "loop" }}
      >
        <img src={loginBackground} width="150" alt="images" />
      </motion.span>
      <motion.span
        animate={{ opacity: 1, y: 0 }}
        initial={{ y: 300, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 shadow-md w-96 rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-color">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="userId">
              UserId
            </label>
            <input
              type="text"
              id="userId"
              className={`w-full text-sm px-3 py-2 rounded-md input-border ${
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
                className={`relative left-72  ${
                  passwordError ? "bottom-12" : "bottom-7"
                }   transform  cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon icons={showPassword ? [faEyeSlash] : [faEye]} />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2 rounded-md btn-background-color btn-background-color:hover transition-all"
          >
            Login
          </button>
        </form>
      </motion.span>
    </div>
  );
};

export default Login;
