// import { Grid, Typography } from "@mui/material";
// import { DesktopOutlined } from "@ant-design/icons";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { FaTasks, FaRegUser } from "react-icons/fa";

// const DashboardCard = ({ title, icon, value }) => {
//   return (
//     <Grid item xs={12} sm={6} md={4} lg={3}>
//       <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex justify-around">
//         <div className="decoration-neutral-400 text-[var(--primary-color)] text-4xl mt-4">
//           {icon}
//         </div>
//         <div className="mt-3">
//           <div className="px-6 font-bold align-middle text-xl">{value}</div>
//           <p className="text-gray-400 text-base ml-2 mb-2 ">{title}</p>
//         </div>
//         {/* <div>
//           <p className={`px-6 pb-3 flex flex-row  ${changeColor}`}>
//             {change} From last week
//           </p>
//         </div> */}
//       </div>
//     </Grid>
//   );
// };
// const Dashboard = () => {
//   return (
//     <Grid container rowSpacing={4.5} columnSpacing={5}>
//       <Grid item xs={12} sx={{ mb: -2.25, mt: 2 }}>
//         <Typography variant="h5">Dashboard</Typography>
//       </Grid>
//       <DashboardCard
//         title="Total Users"
//         icon={<FaRegUser />}
//         value="2,678"
//         change="4%"
//       />
//       <DashboardCard
//         title="Project"
//         icon={<DesktopOutlined />}
//         value="200"
//         change="4%"
//       />
//       <DashboardCard
//         title="Total Task"
//         icon={<FaTasks />}
//         value="100"
//         change="4%"
//       />
//       <DashboardCard
//         title="Pending Task"
//         icon={<MdOutlinePendingActions />}
//         value="278"
//         change="4%"
//       />
//       {/* Add more DashboardCards here for additional metrics */}
//     </Grid>
//   );
// };

// export default Dashboard;
