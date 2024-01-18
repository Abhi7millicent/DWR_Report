// CommonSearchBar.tsx
import React, { useState } from "react";

interface serchBarProps {
  sendDataToParent: (data: string) => void;
}
const CommonSearchBar: React.FC<serchBarProps> = ({ sendDataToParent }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    // Perform search logic here using the 'searchTerm'
    console.log("Search for:", searchTerm);
    sendDataToParent(searchTerm);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default CommonSearchBar;
