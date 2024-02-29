import { useMemo, useState, useEffect } from "react";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import AddProject from "./AddProject";
import CommonModal from "../../layout/commonModal/CommonModal";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddTask from "./AddTask";
import { Button } from "@mui/material";
import { Toaster } from "react-hot-toast";

interface ProjectData {
  id: number;
  name: string;
  type: string;
  description: string;
  startDate: string;
  targetDate: string;
  taskId: string;
}

const ProjectView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("");
  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [data, setData] = useState({
    id: 0,
    type: "",
    name: "",
    description: "",
    taskId: "",
    startDate: "",
    targetDate: "",
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setModalView("");
    getData();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAddClick = (project: any) => {
    setModalView(project.type);
    setData({
      id: project.id,
      type: project.type,
      name: project.name,
      description: project.description,
      taskId: project.taskId,
      startDate: project.startDate,
      targetDate: project.targetDate,
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (project: any) => {
    console.log(project);
  };

  const handleDeleteClick = (projectId: any) => {
    console.log(projectId);
  };

  const columns = useMemo<MRT_ColumnDef<ProjectData>[]>(
    () => [
      // { accessorKey: "id", header: "Sr.no" },
      {
        accessorKey: "type",
        header: "Level",
        size: 40,
        Cell: ({ row }) => (
          <span
            style={{
              color:
                row.original.type === "Project"
                  ? "#0000FF"
                  : row.original.type === "Task"
                  ? "#3FFF00"
                  : row.original.type === "SubTask"
                  ? "#FEBE10"
                  : "#DDA0DD", // Add more conditions as needed
              display: "inline-block",
              padding: "5px",
              borderRadius: "4px",
            }}
          >
            {row.original.type}
          </span>
        ),
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "startDate", header: "Start Date", size: 40 },
      { accessorKey: "targetDate", header: "Target Date", size: 40 },
      {
        accessorKey: "addIcon",
        header: "Add",
        size: 40,
        Cell: ({ row }) => (
          <a onClick={() => handleAddClick(row.original)}>
            <ControlPointRoundedIcon
              fontSize="small"
              className="text-green-600"
            />
          </a>
        ),
      },
      {
        accessorKey: "editIcon",
        header: "Edit",
        size: 40,
        Cell: ({ row }) => (
          <a onClick={() => handleEditClick(row.original)}>
            <BorderColorIcon fontSize="small" className="text-blue-600" />
          </a>
        ),
      },
      {
        accessorKey: "deleteIcon",
        header: "Delete",
        Cell: ({ row }) => (
          <a onClick={() => handleDeleteClick(row.original.id)}>
            <DeleteIcon fontSize="small" className="text-red-600" />
          </a>
        ),
      },
    ],
    []
  );

  const rootData = useMemo(
    () => projectData.filter((r) => !r.taskId),
    [projectData]
  );

  const table = useMaterialReactTable({
    columns,
    data: rootData,
    enableExpanding: true,
    getSubRows: (row) => projectData.filter((r) => r.taskId === String(row.id)),
  });

  const getData = () => {
    fetch("http://localhost:8080/api/DWR/project/list")
      .then((response) => response.json())
      .then((data) => setProjectData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <a onClick={openModal}>
              <Button variant="contained" color="primary">
                Add Project
              </Button>
              {/* <ControlPointRoundedIcon
                fontSize="large"
                className="text-green-600"
              /> */}
            </a>
          </div>
          <div className="mt-4">
            <MaterialReactTable table={table} />
          </div>
        </div>
      </div>
      <div className="w-fit">
        <Toaster reverseOrder={false} />
        <CommonModal isOpen={isModalOpen}>
          {modalView === "" && <AddProject onClose={closeModal} />}
          {modalView !== "" && <AddTask data={data} onClose={closeModal} />}
        </CommonModal>
      </div>
    </div>
  );
};

export default ProjectView;
