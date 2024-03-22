// import axios from "axios";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../../../layout/commonTable/CommonTable";
import EducationDetails from "./EducationDetails";

import toast, { Toaster } from "react-hot-toast";
import { Box, Button, Modal, Typography } from "@mui/material";
import {
  useGetEmployeeEductionList,
  usePutEmployeeEduction,
} from "../../../hook/querie/useEmployeeEduction";
import { useSelector } from "react-redux";
import { RootState } from "../../../App/store";
import CommonModal from "../../../layout/commonModal/CommonModal";

interface EducationalData {
  id: string;
  degree: string;
  institute: string;
  startDate: string;
  endDate: string;
  percentage: string;
}

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
interface EmployeeData {
  firstName: string;
  lastName: string;
}

const ViewEducationDetails = () => {
  const { data } = useSelector((state: RootState) => state.appointmentLetter);

  const { id } = useParams();
  // ------------------ State ---------------- //
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [educationalData, setEducationalData] = useState<EducationalData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteEductionId, setDeleteEductionId] = useState("");
  const [open, setOpen] = useState(false);
  const {
    data: GetEmployeeEductionList,
    refetch: GetEmployeeEductionListRefetch,
  } = useGetEmployeeEductionList(String(id));

  const {
    mutateAsync: PutEmployeeEduction,
    isLoading: PutEmployeeEductionIsLoading,
  } = usePutEmployeeEduction();

  // const fetchData = async () => {

  //   try {
  //     const response = await axios.get<EducationalData[]>(
  //       `http://localhost:8080/api/DWR/educationalDetails/list/${id}`
  //     );
  //     console.log("documentData:", response.data);
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching employee data:", error);
  //   }
  // };

  useEffect(() => {
    setEducationalData(GetEmployeeEductionList?.data);
  }, [GetEmployeeEductionList]);

  useEffect(() => {
    setEmployeeData(data as EmployeeData);
  }, [data]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteClick = async () => {
    const deleteEduction = {
      deleteFlag: true,
    };

    try {
      const response = await PutEmployeeEduction({
        id: deleteEductionId,
        data: deleteEduction,
      });
      // alert("Deleted sucessfully");

      if (response) {
        toast.success("Education deleted sucessfully", {
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
        GetEmployeeEductionListRefetch();
      } else {
        toast.error("Delete  failed. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error deleting educational detail:", error);
    }
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 15 },
    { accessorKey: "1", header: "Degree", size: 30 },
    { accessorKey: "2", header: "Institute", size: 30 },
    { accessorKey: "3", header: "Start Date" },
    { accessorKey: "4", header: "End Date", size: 30 },
    { accessorKey: "5", header: "Percentage", size: 30 },
    { accessorKey: "6", header: "Delete", size: 30 },
  ];

  const tableBody = educationalData?.map((educationalData, index) => [
    index + 1,
    educationalData.degree,
    educationalData.institute,
    educationalData.startDate,
    educationalData.endDate,
    educationalData.percentage,
    <a
      key={`delete-${index}`}
      onClick={() => {
        handleOpen();
        setDeleteEductionId(educationalData?.id);
      }}
    >
      <DeleteIcon fontSize="small" className="text-red-600 cursor-pointer" />
    </a>,
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Educational Details</h2>
            <a onClick={openModal}>
              <Button variant="contained" color="primary">
                Add Education
              </Button>
            </a>
          </div>
          <p className="flex ">
            Employee Name: {employeeData?.firstName} {employeeData?.lastName}
          </p>
          <div className="mt-4">
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          <div className="w-fit">
            <Toaster position="top-center" reverseOrder={false} />
            <CommonModal isOpen={isModalOpen} onClose={closeModal}>
              <EducationDetails
                onClose={closeModal}
                refetchData={GetEmployeeEductionListRefetch}
              />
            </CommonModal>
          </div>
        </div>
      </div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Eduction Delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
              Are you sure to delete the eduction?
            </Typography>
            <div className="flex justify-between mt-7">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fff !important",
                  color: "var( --primary-color) !important",
                  border: "2px solid var( --primary-color) !important",
                  marginLeft: "0px !important",
                }}
                onClick={handleClose}
              >
                close
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                // sx={{ mr: 5 }}
                onClick={handleDeleteClick}
                sx={{
                  backgroundColor: PutEmployeeEductionIsLoading
                    ? "rgb(156 163 175) !important"
                    : "var(--primary-color) !important",
                }}
                disabled={PutEmployeeEductionIsLoading}
              >
                Confirm
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ViewEducationDetails;
