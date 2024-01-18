import React, { useState, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CommonModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center "
    : "hidden";

  return (
    <div className={`${modalClasses} bg-black bg-opacity-50 z-50 p-24`}>
      <div className="bg-white p-8 rounded shadow-md overflow-x-scroll">
        {children}
        <div className="px-4">
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
