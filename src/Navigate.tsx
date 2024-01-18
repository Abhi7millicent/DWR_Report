// import React from "react";
import { Route, Routes } from "react-router";
import Employee from "./components/employee/Employee";
import EmployeeRecord from "./components/employee/EmployeeRecord";
import EmployeeRecordFullData from "./components/employee/EmployeeRecordFullData";
import Register from "./components/register/Register";
import Navbar from "./layout/navbar/Navbar";
import { Layout } from "antd";
import SideBarLayout from "./layout/sideBar/SideBarLayout";

const Navigate = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div>
          <Layout>
            <SideBarLayout />
          </Layout>
        </div>
        <div className="overflow-x-hidden w-full px-10 bg-gray-200">
          <Routes>
            <Route path="/employee" element={<Employee />} />
            <Route
              path="/employee_record/:id/:name"
              element={<EmployeeRecord />}
            />
            <Route
              path="/employee_record/:id"
              element={<EmployeeRecordFullData />}
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
