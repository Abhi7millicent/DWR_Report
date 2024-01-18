import React from "react";
import CottageIcon from "@mui/icons-material/Cottage";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or brand */}
        <div className="text-white text-lg font-bold">YourLogo</div>

        {/* Navigation links */}
        <div className="space-x-4">
          <a href="/employee" className="text-white hover:text-gray-300">
            <CottageIcon />
          </a>
          {/* <a href="#" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Services
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Contact
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
