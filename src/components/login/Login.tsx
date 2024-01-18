import React, { useState } from "react";
import axios from "axios";
import { SetSessionItem } from "../../utils/SessionStorage";
import { useNavigate } from "react-router";

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
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: "linear-gradient(to right, violet, white, yellow)",
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userId"
            >
              UserId
            </label>
            <input
              type="text"
              id="userId"
              className="w-full px-3 py-2 border rounded-md"
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
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
