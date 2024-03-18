import { useEffect, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { useParams } from "react-router";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../../../layout/commonTable/CommonTable";
import Documents from "./Documents";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";
import {
  useGetDocumentList,
  usePutDocument,
} from "../../../hook/querie/useEmployeeDocument";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../App/store";

interface DocumentData {
  id: string;
  documentType: string;
  description: string;
  employeeId: string;
  uploadFilePath: string;
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

const ViewDocuments = () => {
  // ------------------ Redux ---------------- //
  const { data } = useSelector((state: RootState) => state.appointmentLetter);
  // Check if data is an array or not and extract the first item
  const { id } = useParams();

  // ------------------ State ---------------- //
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [documentData, setDocumentData] = useState<DocumentData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDocumentId, setDeleteDocumentId] = useState("");
  const { mutateAsync: PutDocument } = usePutDocument();
  const [open, setOpen] = useState(false);

  const { data: GetDocumentListData, refetch: GetDocumentListRefetch } =
    useGetDocumentList(String(id));

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get<DocumentData[]>(
  //       `http://localhost:8080/api/DWR/document/list/${id}`
  //     );
  //     console.log("documentData:", response.data);
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching employee data:", error);
  //   }
  // };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // ------------------ UseEffect ---------------- //
  useEffect(() => {
    setDocumentData(GetDocumentListData?.data);
  }, [GetDocumentListData]);

  const handleDeleteClick = async () => {
    const deleteDocument = {
      deleteFlag: true,
    };

    try {
      const response = await PutDocument({
        id: deleteDocumentId,
        data: deleteDocument,
      });
      if (response) {
        // Registration successful
        // alert("Registration successful!");
        toast.success("Employee Document delete successful!", {
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
        GetDocumentListRefetch();
      } else {
        // Registration failed
        // alert("Registration failed. Please try again.");
        toast.error("Delete  failed. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {}
    // Add logic to delete the document with the given id
  };

  const tableHead: MRT_ColumnDef<any>[] = [
    { accessorKey: "0", header: "Sr.No", size: 20 },
    { accessorKey: "1", header: "Document Type" },
    { accessorKey: "2", header: "Description" },
    { accessorKey: "3", header: "Download" },
    { accessorKey: "4", header: "Delete" },
  ];

  const tableBody = documentData?.map((documentData, index) => [
    index + 1,
    documentData.documentType,
    documentData.description,

    <a
      key={`download-${index}`}
      href={`https://example.com/api/download/${documentData.id}`}
      download
    >
      <CloudDownloadIcon />
    </a>,
    <a key={`delete-${index}`}>
      <DeleteIcon
        fontSize="small"
        className="text-red-600 cursor-pointer"
        onClick={() => {
          handleOpen();
          setDeleteDocumentId(documentData?.id);
        }}
      />
    </a>,
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setEmployeeData(data as EmployeeData);
  }, [data]);
  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">Documents</h2>
            <a onClick={openModal}>
              <Button variant="contained" color="primary">
                Add Document
              </Button>
            </a>
          </div>
          <p>
            Employee Name: {employeeData?.firstName} {employeeData?.lastName}
          </p>
          <div className="mt-4">
            <CommonTable tableHead={tableHead} tableBody={tableBody} />
          </div>
          <div className="w-fit">
            {/* <CommonModal isOpen={isModalOpen} onClose={closeModal}> */}
            <Toaster reverseOrder={false} />
            <Documents
              isOpen={isModalOpen}
              onClose={closeModal}
              refechData={GetDocumentListRefetch}
            />
            {/* </CommonModal> */}
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
              Document Delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, ml: 2 }}>
              Are you sure to delete the docmuent?
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
    </div>
  );
};

export default ViewDocuments;
