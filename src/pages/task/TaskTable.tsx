import { useState, useEffect } from "react";

import { MRT_ColumnDef } from "material-react-table";
import AddTask from "./AddTask";
import CommonModal from "../../layout/commonModal/CommonModal";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box, Button, Modal, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import CommonMaterialTable from "../../layout/commonTable/CommonTable";
import {
  useDeleteTaskById,
  useGetTaskById,
  useGetTaskList,
} from "../../hook/querie/useTasks";

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

const TaskTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("");
  const [taskData, setTaskData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState("");
  const [editTaskId, setEditTaskId] = useState("");
  const [editTaskIdData, setEditTaskIdData] = useState("");
  const [editTask, setEditTask] = useState(false);

  // ------------------------------- React Query ------------------------------ //
  const { data: GetTaskListData, refetch: GetTaskListRefetch } =
    useGetTaskList();

  const { mutateAsync: DeleteTaskById } = useDeleteTaskById();
  const { data: GetTaskByIdData } = useGetTaskById(editTaskId);

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
    const deleteTask = {
      deleteFlag: true,
    };

    try {
      const response = await DeleteTaskById({
        id: deleteTaskId,
        data: deleteTask,
      });
      if (response) {
        toast.success("Task delete successful!", {
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
        GetTaskListRefetch();
      } else {
        toast.error("Delete  failed. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    setTaskData(GetTaskListData);
  }, [GetTaskListData]);
  useEffect(() => {
    setEditTaskIdData(GetTaskByIdData);
  }, [GetTaskByIdData]);
  const handleEditClick = async (TaskId: string) => {
    setEditTaskId(TaskId);
    openModal();
    setEditTaskIdData(GetTaskByIdData || []);
  };
  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 20 },
    { accessorKey: "1", header: "Project Name", size: 20 },
    { accessorKey: "2", header: "Task Name" },
    { accessorKey: "3", header: "Task Type" },
    { accessorKey: "4", header: "Assign Name" },
    { accessorKey: "5", header: "Start Date" },
    { accessorKey: "6", header: "End Date" },
    { accessorKey: "7", header: "Edit" },
    { accessorKey: "8", header: "Delete" },
  ];

  const tableBody = taskData?.map((item, index) => [
    index + 1,
    item.projectId.label,
    item.name,
    item.taskType.label,
    item.assignTo.label,
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
          setDeleteTaskId(item?.id);
        }}
      />
    </a>,
  ]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
            <a
              onClick={() => {
                openModal();
                setEditTask(true);
              }}
            >
              <Button variant="contained" color="primary">
                Add Task
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
            <AddTask
              onClose={closeModal}
              refetchData={GetTaskListRefetch}
              editTaskId={editTaskId}
              editTaskIdData={editTaskIdData}
              setEditTask={setEditTask}
              editTask={editTask}
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
            Task Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
            Are you sure to delete the task?
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

export default TaskTable;
