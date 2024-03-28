import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useMemo, CSSProperties } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDropzone, FileWithPath } from "react-dropzone";
import { usePostUploadLetter } from "../../hook/querie/useLetter";
import toast, { Toaster } from "react-hot-toast";

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "14px",
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

function CustomOfferLetter() {
  const {
    formState: { errors },
    control,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      selectLetter: "",
      uploadLetter: null, // Set default value to null for file upload
    },
  });

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (acceptedFiles: FileWithPath[]) => {
      // When files are dropped, update form value with the file(s)
      setValue("uploadLetter", acceptedFiles);
    },
  });

  // React Query
  const { mutateAsync: PostUploadLetter } = usePostUploadLetter();
  console.log(acceptedFiles, "acceptedFiles");

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>{file.path}</li>
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

  const handleLetterSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("letterType", data.selectLetter);
    formData.append("path", data.uploadLetter[0]);

    try {
      const response = await PostUploadLetter(formData);

      if (response) {
        console.log("Document saved letter!");
        toast.success("Document saved letter!", {
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
        reset();
        setValue("uploadLetter", []);

        // Optionally, you can reset the form fields or fetch updated data
      } else {
        toast.error("Failed to upload letter.", {
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
        });
        // Handle error or display a message to the user
      }
    } catch (error) {
      console.error("An error occurred while saving the letter:", error);
      // Handle error or display a message to the user
    }
  };

  return (
    <div className="flex  mt-3 justify-center">
      <Toaster reverseOrder={false} />
      <div className="bg-white p-8 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add Letter</h2>
        <form onSubmit={handleSubmit(handleLetterSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id="selectLetter"
                  sx={{
                    "&.MuiInputLabel-root": {
                      color: "var(--primary-color) !important",
                    },
                  }}
                >
                  Select Letter
                </InputLabel>
                <Controller
                  control={control}
                  name="selectLetter"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="selectLetter"
                      id="demo-simple-select"
                      label="Select Letter"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value}
                      sx={{
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--primary-color) !important",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--primary-color) !important",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--primary-color) !important",
                        },
                      }}
                    >
                      <MenuItem value="Appointment Letter">
                        Appointment Letter
                      </MenuItem>
                      <MenuItem value="Offer Letter">Offer Letter</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              {errors.selectLetter &&
                errors.selectLetter.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <section className="container">
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <aside className="flex mt-1 gap-2">
                    <h4>FileName: </h4>
                    <ul>{files}</ul>
                  </aside>
                </section>
              </div>
              {errors.uploadLetter?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
          </Grid>

          <div className="mt-4 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // sx={
              //   acceptedFiles.length === 0
              //     ? {
              //         cursor: "not-allowed",
              //         opacity: 0.5,
              //       }
              //     : {} // No additional styles when button is enabled
              // }
              disabled={acceptedFiles.length === 0}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomOfferLetter;
