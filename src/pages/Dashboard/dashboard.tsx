import { Grid, Typography } from "@mui/material";

import {
  MdOutlinePendingActions,
  MdOutlineHolidayVillage,
} from "react-icons/md";
import { FaTasks, FaRegUser } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import { GetSessionItem } from "../../utils/SessionStorage";
import { BiTask } from "react-icons/bi";

const DashboardCard = ({ title, icon, value }) => {
  console.log(GetSessionItem("role"), "GetSessionItem");

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex justify-around">
        <div className="decoration-neutral-400 text-[var(--primary-color)] text-4xl mt-4">
          {icon}
        </div>
        <div className="mt-3">
          <div className="px-6 font-bold align-middle text-xl">{value}</div>
          <p className="text-gray-400 text-base ml-2 mb-2 ">{title}</p>
        </div>
        {/* <div>
          <p className={`px-6 pb-3 flex flex-row  ${changeColor}`}>
            {change} From last week
          </p>
        </div> */}
      </div>
    </Grid>
  );
};
const Dashboard = () => {
  const options = {
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  };
  const series = [
    {
      name: "User",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
    {
      name: "Project",
      data: [23, 12, 54, 61, 32, 56, 81, 19],
    },
    {
      name: "Task",
      data: [24, 20, 5, 75, 42, 79, 72, 35],
    },
    {
      name: "Pending Task",
      data: [15, 20, 5, 30, 42, 49, 30, 35],
    },
  ];
  const seriesEmployee = [
    {
      name: "Total Task",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
    {
      name: "Pending Task",
      data: [23, 12, 54, 61, 32, 56, 81, 19],
    },
    {
      name: "Complete Task",
      data: [24, 20, 5, 75, 42, 79, 72, 35],
    },
    {
      name: "Leave",
      data: [15, 20, 5, 30, 42, 49, 30, 35],
    },
  ];
  return (
    <>
      {GetSessionItem("role") === "admin" ? (
        <Grid container rowSpacing={4.5} columnSpacing={5}>
          <Grid item xs={12} sx={{ mb: -2.25, mt: 2 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
          <DashboardCard
            title="Total Users"
            icon={<FaRegUser />}
            value="2,678"
          />
          <DashboardCard
            title="Project"
            icon={<RiComputerLine />}
            value="200"
          />
          <DashboardCard title="Total Task" icon={<FaTasks />} value="100" />
          <DashboardCard
            title="Pending Task"
            icon={<MdOutlinePendingActions />}
            value="50"
          />
          {/* Add more DashboardCards here for additional metrics */}
          <Grid className="w-1/2 mt-6 ml-10 bg-white p-4 rounded-lg   ">
            <Chart options={options} series={series} type="area" />
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={4.5} columnSpacing={5}>
          <Grid item xs={12} sx={{ mb: -2.25, mt: 2 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
          <DashboardCard title="Total Task" icon={<FaTasks />} value="50" />
          <DashboardCard
            title="Pending Task"
            icon={<MdOutlinePendingActions />}
            value="15"
          />
          <DashboardCard title="Complete Task" icon={<BiTask />} value="35" />
          <DashboardCard
            title="Leave"
            icon={<MdOutlineHolidayVillage />}
            value="10"
          />
          {/* Add more DashboardCards here for additional metrics */}
          <Grid className="w-1/2 mt-6 ml-10">
            <Chart options={options} series={seriesEmployee} type="area" />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
