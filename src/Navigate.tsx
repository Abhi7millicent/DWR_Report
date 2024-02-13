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
import AttendanceCalendar from "./layout/calendar/AttendanceCalendar";
import Request from "./components/notification/Request";
// import ApplyLeave from "./components/leaveManagement/ApplyLeave";
import ViewAppliedLeave from "./components/leaveManagement/ViewAppliedLeave";

const Navigate = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex  h-[calc(100vh-5rem)]">
        <div className="bg-gray-200 ">
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
            <Route path="/viewLeave" element={<ViewAppliedLeave />} />
            <Route path="/request" element={<Request />} />
            <Route path="/project" element={<ProjectView />} />
            <Route path="/editEmployee/:id" element={<EditEmployeeDetails />} />
            <Route
              path="/attendance/:id/:name"
              element={<AttendanceCalendar />}
            />
            <Route path="/attendance/:id" element={<AttendanceCalendar />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
