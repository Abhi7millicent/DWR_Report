// import React from "react";
import { Route, Routes } from "react-router";
import Employee from "./pages/employee/Employee";
import EmployeeRecord from "./pages/employee/EmployeeRecord";
import EmployeeRecordFullData from "./pages/employee/EmployeeRecordFullData";
// import Register from "./components/register/Register";
import Navbar from "./layout/navbar/Navbar";
import { Layout } from "antd";
import SideBarLayout from "./layout/sideBar/SideBarLayout";
import Project from "./pages/project/ProjectView";
import EditEmployeeDetails from "./pages/register/editEmployeeDetails/EditEmployeeDetails";
import AttendanceCalendar from "./layout/calendar/AttendanceCalendar";
import Request from "./components/notification/Request";
// import ApplyLeave from "./components/leaveManagement/ApplyLeave";
import ViewAppliedLeave from "./pages/leaveManagement/ViewAppliedLeave";
import OfferLetter from "./layout/offerLetter/OfferLetter";
import CustomOfferLetter from "./components/customization/CustomOfferLetter";
import CustomAppointmentLetter from "./components/customization/CustomAppointmentLetter";
// import LeadTable from "./pages/Lead/LeadTable";
import TaskHandlingTable from "./pages/TaskHandling/TaskHandlingTable";
import Dashboard from "./pages/Dashboard/dashboard";
import TaskTable from "./pages/task/TaskTable";
import ProjectViewTable from "./pages/projectView/ProjectViewTable";

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route
              path="/employee_record/:id/:name"
              element={<EmployeeRecord />}
            />
            <Route
              path="/employee_record_data/:id/:name"
              element={<EmployeeRecordFullData />}
            />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/apply-leave" element={<ViewAppliedLeave />} />
            <Route path="/offerLetter" element={<OfferLetter />} />
            <Route path="/request" element={<Request />} />
            <Route path="/project" element={<Project />} />
            <Route path="/editEmployee/:id" element={<EditEmployeeDetails />} />
            <Route
              path="/attendance/:id/:name"
              element={<AttendanceCalendar />}
            />
            <Route path="/attendance/:id" element={<AttendanceCalendar />} />
            <Route
              path="/custom-appointment-letter"
              element={<CustomAppointmentLetter />}
            />
            <Route
              path="/custom-offer-letter"
              element={<CustomOfferLetter />}
            />
            {/* <Route path="/lead" element={<LeadTable />} /> */}
            <Route path="/assign-task" element={<TaskHandlingTable />} />
            <Route path="/task" element={<TaskTable />} />
            <Route path="/project-view" element={<ProjectViewTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
