import { Button } from "@mui/material";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import ProjectViewAssignTask from "./ProjectViewAssignTask";
import CommonModal from "../../layout/commonModal/CommonModal";
import CommonMaterialTable from "../../layout/commonTable/CommonTable";
import { MRT_ColumnDef } from "material-react-table";

// Define menuData outside the component
export const menuData = [
  {
    title: "DWR",
    items: [
      {
        title: "Task",
        name: "task1",
        items: [
          {
            title: "Subtask",
            items: [
              { name: "Subtask1" },
              { name: "Subtask2" },
              {
                title: "Sub Sub Task",
                items: [{ name: "Sub Sub Task1" }, { name: "Sub Sub Task2" }],
              },
            ],
          },
        ],
      },
    ],
  },
];

function ProjectViewTable() {
  // ---------------------- State -------------------- //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 30 },
    { accessorKey: "1", header: "Project Name" },
    { accessorKey: "2", header: "Task Name" },
    { accessorKey: "3", header: "Sub Task" },
  ];
  const tableBody = data?.map((item, index) => [
    index + 1,
    item.first_name,
    item.last_name,
    item.email,
  ]);
  return (
    <div className="mt-10 mb-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full mb-4 ">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 px-1">Project View</h2>
            <Button variant="contained" color="primary" onClick={openModal}>
              Assign Task
            </Button>
          </div>
          <div className="w-fit">
            {/* <CommonModal isOpen={isModalOpen} onClose={closeModal}> */}
            <Toaster position="top-center" reverseOrder={false} />
            <CommonModal isOpen={isModalOpen} onClose={closeModal}>
              {modalView === "" && (
                <ProjectViewAssignTask onClose={closeModal} />
              )}
            </CommonModal>
          </div>
          <div className="flex justify-between gap-2">
            <div className="mt-2">
              {menuData.map((item, index) => (
                <ul
                  key={index}
                  className="menu menu-xs bg-slate-200 rounded-lg max-w-xs w-full"
                >
                  <li>
                    <details open>
                      <summary>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                          />
                        </svg>
                        {item.title}
                      </summary>
                      <ul>
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>{renderSubMenu(subItem)}</li>
                        ))}
                      </ul>
                    </details>
                  </li>
                </ul>
              ))}
            </div>
            <div className="mt-2 w-3/4">
              <CommonMaterialTable
                tableHead={tableHead}
                tableBody={tableBody}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderSubMenu(subItem) {
  return (
    <details open>
      <summary>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
        {subItem.title}
      </summary>
      <ul>
        {subItem.items.map((nestedItem, nestedIndex) => (
          <li key={nestedIndex}>
            {nestedItem.title ? (
              renderSubMenu(nestedItem)
            ) : (
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                {nestedItem.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}

export default ProjectViewTable;

export const data = [
  {
    id: 1,
    first_name: "DWR",
    last_name: "Login",
    email: "From",
  },
  {
    id: 2,
    first_name: "CSE",
    last_name: "Register",
    email: "OTP",
  },
  {
    id: 3,
    first_name: "RD Brother",
    last_name: "Activity",
    email: "Create Table",
  },
];
