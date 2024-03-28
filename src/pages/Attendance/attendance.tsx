import { Button } from "@mui/material";
import { useMemo, CSSProperties } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { usePostUploadAttendance } from "../../hook/querie/useUploadAttendance";
import toast, { Toaster } from "react-hot-toast";
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
  cursor: "pointer",
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
const Attendance = () => {
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

  console.log(acceptedFiles, "acceptedFiles");

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  //--------------------------React query --------------------//

  const { mutateAsync: PostUploadAttendanceMutateAsync } =
    usePostUploadAttendance();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    try {
      const response = await PostUploadAttendanceMutateAsync(formData);
      console.log(response, "response");

      if (response) {
        console.log("Attendance upload successfully !!");
        toast.success("Attendance upload successfully !!", {
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
      } else {
        toast.error("Failed to attendance upload.");
      }
    } catch (error) {}
  };
  return (
    <div className="mt-4 mb-4 h-[calc(100vh-5rem)]">
      <Toaster reverseOrder={false} />
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-full mb-4 ">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4">Upload Attendance </h2>
          </div>
          <form onSubmit={handleSubmit}>
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
            <div className="flex justify-end mt-2 ">
              {/* <Button
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
            </Button> */}
              <Button
                variant="contained"
                color="primary"
                disabled={acceptedFiles.length === 0}
                type="submit"
              >
                Add Attendance
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
