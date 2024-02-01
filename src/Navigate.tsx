// import React from "react";
import { Route, Routes } from "react-router";
import Employee from "./components/employee/Employee";
import EmployeeRecord from "./components/employee/EmployeeRecord";
import EmployeeRecordFullData from "./components/employee/EmployeeRecordFullData";
import Register from "./components/register/Register";
import Navbar from "./layout/navbar/Navbar";
import { Layout } from "antd";
import SideBarLayout from "./layout/sideBar/SideBarLayout";
import ProjectView from "./components/project/ProjectView";
import EditEmployeeDetails from "./components/register/editEmployeeDetails/EditEmployeeDetails";

const Navigate = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="bg-gray-800">
          <Layout>
            <SideBarLayout />
          </Layout>
        </div>
        <div className="overflow-auto w-full px-10 bg-gray-200">
          <Routes>
            <Route path="/employee" element={<Employee />} />
            <Route
              path="/employee_record/:id/:name"
              element={<EmployeeRecord />}
            />
            <Route
              path="/employee_record_data/:id/:name"
              element={<EmployeeRecordFullData />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/project" element={<ProjectView />} />
            <Route path="/editEmployee/:id" element={<EditEmployeeDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
