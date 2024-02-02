import React, { useState } from "react";
import axios from "axios";
import { SetSessionItem } from "../../utils/SessionStorage";
import { useNavigate } from "react-router";
import "../../App.css";
import loginBackground from "../../assets/logo-color.png";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        className="bg-white p-8 rounded shadow-md w-96 rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#226d6dbf]">
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
              className="w-full text-sm px-3 py-2 border-[#226d6dbf] border rounded-md outline-[#226d6d8c] outline-[0.3px] "
              placeholder="Enter your userId"
              value={userId}
              required
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 text-sm py-2 border-[#226d6dbf] border rounded-md outline-[#226d6d8c] outline-[0.3px] "
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-md bg-[#226d6dbf] hover:bg-[#1e5959d0] transition-all"
          >
            Login
          </button>
        </form>
      </motion.span>
    </div>
  );
};

export default Login;
