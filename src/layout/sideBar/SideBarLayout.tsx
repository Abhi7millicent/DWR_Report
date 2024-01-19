import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const sidebarItems: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Register", "register", <ContainerOutlined />),
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
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
];

const SideBarLayout: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
    console.log("Clicked item key:", e.key);
  };

  useEffect(() => {
    if (selectedKey !== "") {
      navigate(`/${selectedKey}`);
    }
  }, [selectedKey, navigate]);

  return (
    <div
      className={` bg-gray-800 text-white transition-all delay-150 duration-300 h-screen ${
        !isExpanded ? " w-20" : "w-64"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Menu
        mode="vertical"
        theme="dark"
        inlineCollapsed={!isExpanded}
        items={sidebarItems}
        onClick={handleMenuClick}
        className={`transition-all delay-150 duration-300 ${
          !isExpanded ? " w-20" : "w-64"
        }`}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex bg-gray-800">
      <SideBarLayout />
      {/* Add your content here */}
    </div>
  );
};

export default App;
