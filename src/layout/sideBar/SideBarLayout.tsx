import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChartOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "../../App.css";
import { GetSessionItem } from "../../utils/SessionStorage";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FaRegUser, FaTasks } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiMiniUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineForwardToInbox } from "react-icons/md";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  onClick?: () => void // Add onClick type definition
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick, // Include onClick handler
  } as MenuItem;
}

const SideBarLayout: React.FC<{ sidebarItems: any[] }> = ({ sidebarItems }) => {
  const [selectedKey, setSelectedKey] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  useEffect(() => {
    if (selectedKey !== "") {
      navigate(`/${selectedKey}`);
    }
  }, [selectedKey]);

  return (
    <>
      <div
        className={` text-white transition-all delay-150 duration-300   ${
          !isExpanded ? " w-20" : "w-64"
        } `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <Menu
          selectedKeys={[selectedKey]}
          mode="vertical"
          inlineCollapsed={!isExpanded}
          items={sidebarItems}
          onClick={handleMenuClick}
          className={`transition-all delay-150 duration-300  ${
            !isExpanded ? " w-20" : "w-64"
          }`}
        />
      </div>
    </>
  );
};

const App: React.FC = () => {
  // State to store employee role
  const [employeeRole, setEmployeeRole] = useState<string | null>(null);
  const employeeId = GetSessionItem("id");
  useEffect(() => {
    // Fetch employee role asynchronously
    const role = GetSessionItem("role");

    if (role) {
      setEmployeeRole(role);
    }
  }, []);

  const sidebarItems: MenuItem[] =
    employeeRole === "SoftwareEngineer"
      ? [
          getItem("Dashboard", "dashboard", <PieChartOutlined />),
          getItem(
            "Attendance",
            `attendance/${employeeId}`,
            <CalendarMonthIcon />
          ),
          getItem("Apply Leave", "apply-leave", <HomeOutlined />),
          // getItem("Setting", "sub3", <SettingsSuggestIcon fontSize="large" />, [
          //   getItem("Profile", "profile", <AccountCircleIcon />),
          //   getItem(
          //     "Logout",
          //     "logout",
          //     <MeetingRoomIcon />,
          //     undefined,
          //     undefined,
          //     handleLogout
          //   ), // Add onClick handler for Logout
          // ]),
        ]
      : employeeRole === "admin"
      ? [
          getItem("Dashboard", "dashboard", <AiOutlineDashboard />),
          getItem("Employee", "employee", <FaRegUser />),
          getItem("Project", "project", <RiComputerLine />),
          getItem("Task", "task", <FaTasks />),
          getItem("Project View", "project-view", <FaTasks />),
          getItem("Lead", "lead", <HiMiniUsers />),
          getItem("Assign Task", "assign-task", <HiMiniUsers />),
          getItem("Notification", "sub1", <MdOutlineForwardToInbox />, [
            getItem("Attendance Request", "request"),
            getItem("Mail", "sub2", null, [
              getItem("Offer Letter", "offerLetter"),
              // getItem("Option 12", "12"),
            ]),
            // getItem("Option 6", "6"),
            // getItem("Option 7", "7"),
            // getItem("Option 8", "8"),
          ]),
          // getItem("Settings", "sub3", <AppstoreOutlined />, [
          //   getItem("Letter", "9"),
          //   getItem("Option 10", "10"),
          // ]),
          getItem("Settings", "sub3", <IoSettingsOutline />, [
            getItem("Customization", "9", null, [
              getItem("Letter", "custom-offer-letter"),
              // getItem("Appointment Letter", "custom-appointment-letter"),
            ]),
            // getItem("Option 10", "10"),
          ]),

          // getItem("Setting", "sub4", <SettingsSuggestIcon fontSize="large" />, [
          //   getItem("Profile", "profile", <AccountCircleIcon />),
          //   getItem(
          //     "Logout",
          //     "logout",
          //     <MeetingRoomIcon />,
          //     undefined,
          //     undefined,
          //     handleLogout
          // ), // Add onClick handler for Logout
          // ]),
        ]
      : [];
  return (
    <div className="flex bg-white h-[calc(100vh-5rem)]">
      <SideBarLayout sidebarItems={sidebarItems} />
      {/* Add your content here */}
    </div>
  );
};

export default App;
