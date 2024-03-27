import { useState, useEffect } from "react";

import { MRT_ColumnDef } from "material-react-table";
import AddProject from "./AddProject";
import CommonModal from "../../layout/commonModal/CommonModal";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, Modal, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import CommonMaterialTable from "../../layout/commonTable/CommonTable";
import {
  useDeleteProjectById,
  useGetProjectById,
  useGetProjectList,
} from "../../hook/querie/useProjects";

import ConpmayLogo from "../../assets/mail.png";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

const ProjectView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [editProjectId, setEditProjectId] = useState("");
  const [editProjectIdData, setEditProjectIdData] = useState("");
  const [editProject, setEditProject] = useState(false);

  // ------------------------------- React Query ------------------------------ //
  const { data: GetProjectListData, refetch: GetProjectListRefetch } =
    useGetProjectList();

  const { mutateAsync: DeleteProjectById } = useDeleteProjectById();
  const { data: GetProjectByIdData } = useGetProjectById(editProjectId);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const closeModal = () => {
    setIsModalOpen(false);
    setModalView("");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteClick = async () => {
    const deleteProject = {
      deleteFlag: true,
    };

    try {
      const response = await DeleteProjectById({
        id: deleteProjectId,
        data: deleteProject,
      });
      if (response) {
        toast.success("Project delete successful!", {
          position: "top-center",
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
          iconTheme: {
            primary: "var(--primary-color)",
            secondary: "#fff",
          },
        });
        handleClose();
        GetProjectListRefetch();
      } else {
        toast.error("Delete  failed. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {}
  };

  // const columns = useMemo<MRT_ColumnDef<ProjectData>[]>(
  //   () => [
  //     // { accessorKey: "id", header: "Sr.no" },
  //     {
  //       accessorKey: "type",
  //       header: "Level",
  //       size: 40,
  //       Cell: ({ row }) => (
  //         <span
  //           style={{
  //             color:
  //               row.original.type === "Project"
  //                 ? "#0000FF"
  //                 : row.original.type === "Task"
  //                 ? "#3FFF00"
  //                 : row.original.type === "SubTask"
  //                 ? "#FEBE10"
  //                 : "#DDA0DD", // Add more conditions as needed
  //             display: "inline-block",
  //             padding: "5px",
  //             borderRadius: "4px",
  //           }}
  //         >
  //           {row.original.type}
  //         </span>
  //       ),
  //     },
  //     { accessorKey: "name", header: "Name" },
  //     { accessorKey: "description", header: "Description" },
  //     { accessorKey: "startDate", header: "Start Date", size: 40 },
  //     { accessorKey: "targetDate", header: "Target Date", size: 40 },
  //     {
  //       accessorKey: "addIcon",
  //       header: "Add",
  //       size: 40,
  //       Cell: ({ row }) => (
  //         <a onClick={() => handleAddClick(row.original)}>
  //           <ControlPointRoundedIcon
  //             fontSize="small"
  //             className="text-green-600"
  //           />
  //         </a>
  //       ),
  //     },
  //     {
  //       accessorKey: "editIcon",
  //       header: "Edit",
  //       size: 40,
  //       Cell: ({ row }) => (
  //         <a onClick={() => handleEditClick(row.original)}>
  //           <BorderColorIcon fontSize="small" className="text-blue-600" />
  //         </a>
  //       ),
  //     },
  //     {
  //       accessorKey: "deleteIcon",
  //       header: "Delete",
  //       Cell: ({ row }) => (
  //         <a onClick={() => handleDeleteClick(row.original.id)}>
  //           <DeleteIcon fontSize="small" className="text-red-600" />
  //         </a>
  //       ),
  //     },
  //   ],
  //   []
  // );

  // const rootData = useMemo(
  //   () => projectData.filter((r) => !r.taskId),
  //   [projectData]
  // );

  // const table = useMaterialReactTable({
  //   columns,
  //   data: rootData,
  //   enableExpanding: true,
  //   getSubRows: (row) => projectData.filter((r) => r.taskId === String(row.id)),
  // });

  useEffect(() => {
    setProjectData(GetProjectListData);
  }, [GetProjectListData]);
  useEffect(() => {
    setEditProjectIdData(GetProjectByIdData);
  }, [GetProjectByIdData]);
  const handleEditClick = async (projectId: string) => {
    setEditProjectId(projectId);
    openModal();
    setEditProjectIdData(GetProjectByIdData || []);
  };
  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 20 },
    { accessorKey: "1", header: "Project Name" },
    { accessorKey: "2", header: "Client Name" },
    { accessorKey: "3", header: "Client Number" },
    { accessorKey: "4", header: "Email" },
    { accessorKey: "5", header: "Start Date" },
    { accessorKey: "6", header: "End Date" },
    { accessorKey: "7", header: "Edit" },
    { accessorKey: "8", header: "Delete" },
  ];

  const tableBody = projectData?.map((item, index) => [
    index + 1,
    item.name,
    item.clientName,
    item.contactNo,
    item.emailId,
    item.startDate,
    item.endDate,
    <a onClick={() => handleEditClick(item.id)}>
      <BorderColorIcon
        fontSize="small"
        className="text-blue-600 cursor-pointer"
      />
    </a>,

    <a>
      <DeleteIcon
        fontSize="small"
        className="text-red-600 cursor-pointer"
        onClick={() => {
          handleOpen();
          setDeleteProjectId(item?.id);
        }}
      />
    </a>,
  ]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <a
              onClick={() => {
                openModal();
                setEditProject(true);
              }}
            >
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
            <CommonMaterialTable tableHead={tableHead} tableBody={tableBody} />
          </div>
        </div>
      </div>
      <div className="w-fit">
        <Toaster reverseOrder={false} />
        <CommonModal isOpen={isModalOpen} onClose={closeModal}>
          {modalView === "" && (
            <AddProject
              onClose={closeModal}
              refetchData={GetProjectListRefetch}
              editProjectId={editProjectId}
              editProjectIdData={editProjectIdData}
              setEditProject={setEditProject}
              editProject={editProject}
            />
          )}
          {/* {modalView !== "" && <AddTask data={data} onClose={closeModal} />} */}
        </CommonModal>
      </div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Project Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
            Are you sure to delete the project?
          </Typography>
          <div className="flex justify-between mt-7">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff !important",
                color: "var( --primary-color) !important",
                border: "2px solid var( --primary-color) !important",
              }}
              onClick={handleClose}
            >
              close
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mr: 5 }}
              onClick={handleDeleteClick}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectView;
