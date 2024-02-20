import React from "react";
import { GetSessionItem } from "../../utils/SessionStorage";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ProfileDropDown from "../profileDropDown/ProfileDropDown";
import loginBackground from "../../assets/logo-color.png";
import "../../App.css";
const Navbar: React.FC = () => {
  // const [isProfileDropDownOpen, setProfileDropDownOpen] = useState(false);

  // const haldleProfile = () => {
  //   setProfileDropDownOpen((prev) => !prev);
  // };

  return (
    <nav className="bg-slate-50 p-4 h-[5rem]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or brand */}
        <img src={loginBackground} width="100" alt="images" />

        {/* Navigation links */}
        <div className="flex gap-4">
          <b>Welcome : {GetSessionItem("name")}</b>
          {/* <div
            onClick={haldleProfile}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            <AccountCircleIcon />
            {isProfileDropDownOpen && <ProfileDropDown />}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
