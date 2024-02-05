// import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { useNavigate } from "react-router";
import { clearSessionStorage } from "../../utils/SessionStorage";

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearSessionStorage();
    navigate("/");
  };
  return (
    <div className="flex flex-col ProfileDropDown bg-white z-50 transition-all duration-400 delay-75">
      <ul className="flex flex-col gap-4">
        <li className="cursor-pointer">
          <AccountCircleIcon />
          <label className="px-2">Profile</label>
        </li>
        <li className="cursor-pointer">
          <SettingsIcon />
          <label className="px-2">Setting</label>
        </li>
        <li className="cursor-pointer" onClick={handleLogout}>
          <MeetingRoomIcon />
          <label className="px-2">Logout</label>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;
