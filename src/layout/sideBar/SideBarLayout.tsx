import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "../../App.css";
import { GetSessionItem } from "../../utils/SessionStorage";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { clearSessionStorage } from "../../utils/SessionStorage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
  const navigate = useNavigate();
  const employeeId = GetSessionItem("id");
  useEffect(() => {
    // Fetch employee role asynchronously
    const role = GetSessionItem("role");

    if (role) {
      setEmployeeRole(role);
    }
  }, []);

  function handleLogout() {
    clearSessionStorage();
    navigate("/");
  }
  const sidebarItems: MenuItem[] =
    employeeRole === "softwareEngineer"
      ? [
          getItem("Dashboard", "dashboard", <PieChartOutlined />),
          getItem(
            "Attendance",
            `attendance/${employeeId}`,
            <CalendarMonthIcon />
          ),
          getItem("Setting", "sub3", <SettingsSuggestIcon fontSize="large" />, [
            getItem("Profile", "profile", <AccountCircleIcon />),
            getItem(
              "Logout",
              "logout",
              <MeetingRoomIcon />,
              undefined,
              undefined,
              handleLogout
            ), // Add onClick handler for Logout
          ]),
        ]
      : employeeRole === "admin"
      ? [
          getItem("Dashboard", "dashboard", <PieChartOutlined />),
          getItem("Employee", "employee", <UserOutlined />),
          getItem("Project", "project", <DesktopOutlined />),
          getItem("Notification", "sub1", <MailOutlined />, [
            getItem("Attendance Request", "request"),
            getItem("Option 6", "6"),
            getItem("Option 7", "7"),
            getItem("Option 8", "8"),
          ]),
          getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
            getItem("Option 9", "9"),
            getItem("Option 10", "10"),
            getItem("Submenu", "sub3", null, [
              getItem("Option 11", "11"),
              getItem("Option 12", "12"),
            ]),
          ]),
          getItem("Setting", "sub4", <SettingsSuggestIcon fontSize="large" />, [
            getItem("Profile", "profile", <AccountCircleIcon />),
            getItem(
              "Logout",
              "logout",
              <MeetingRoomIcon />,
              undefined,
              undefined,
              handleLogout
            ), // Add onClick handler for Logout
          ]),
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
