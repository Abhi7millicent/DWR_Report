import { Button } from "@mui/material";
import { useMemo, CSSProperties } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "var(--primary-color)",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "var(--primary-color)",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const UploadAttendance: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center "
    : "hidden";

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  const files = acceptedFiles.map((files: FileWithPath) => (
    <li key={files?.path}>{files?.path}</li>
  ));
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <div className={`${modalClasses} z-10`}>
      <div className="flex items-center  mt-3 justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Upload Attendance</h2>
          <section className="container">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className="flex mt-1 gap-2">
              <h4>FileName: </h4>
              <ul>{files}</ul>
            </aside>
          </section>
          <div className="flex justify-between mt-2 ">
            <Button
              onClick={() => {
                onClose();
              }}
              variant="contained"
              sx={{
                backgroundColor: "#fff !important",
                color: "var( --primary-color) !important",
                border: "2px solid var( --primary-color) !important",
                marginLeft: "0px !important",
              }}
            >
              close
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Add Attendance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAttendance;
