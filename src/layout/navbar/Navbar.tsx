import React from "react";
// import { GetSessionItem } from "../../utils/SessionStorage";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ProfileDropDown from "../profileDropDown/ProfileDropDown";
import loginBackground from "../../assets/logo-color.png";
import "../../App.css";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Avatar, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import {
  GetSessionItem,
  clearSessionStorage,
} from "../../utils/SessionStorage";
import { useNavigate } from "react-router";
const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate(`/editEmployee/${GetSessionItem("id")}`);
  };
  const handleLogout = () => {
    clearSessionStorage();
    navigate("/");
  };
  return (
    <nav className="bg-slate-50 p-4 h-[5rem]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or brand */}
        <img src={loginBackground} width="100" alt="images" />

        {/* Navigation links */}
        <div className="flex gap-4">
          <div>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar>{GetSessionItem("name")?.slice(0, 1)}</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleProfile}>
                  <Space direction="vertical" size={16}>
                    <Space wrap size={16}>
                      <Avatar size="small" icon={<UserOutlined />} /> Profile
                    </Space>
                  </Space>
                </MenuItem>
                <Divider />

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
            {/* {isProfileDropDownOpen && <ProfileDropDown />} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
