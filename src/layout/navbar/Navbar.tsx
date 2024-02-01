import React from "react";
import CottageIcon from "@mui/icons-material/Cottage";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ProfileDropDown from "../profileDropDown/ProfileDropDown";

const Navbar: React.FC = () => {
  // const [isProfileDropDownOpen, setProfileDropDownOpen] = useState(false);

  // const haldleProfile = () => {
  //   setProfileDropDownOpen((prev) => !prev);
  // };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or brand */}
        <div className="text-white text-lg font-bold">YourLogo</div>

        {/* Navigation links */}
        <div className="flex gap-4">
          <a href="/employee" className="text-white hover:text-gray-300">
            <CottageIcon />
          </a>
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
