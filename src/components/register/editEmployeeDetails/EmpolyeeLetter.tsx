import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../InputField/InputField";
import { Button, Grid, TextareaAutosize } from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
function EmpolyeeLetter() {
  const {
    formState: { errors },
    control,
    clearErrors,
    register,

    handleSubmit,
  } = useForm({
    defaultValues: {
      date: "",
      position: "",
      referenceNo: "",
      letter: "",
      mailContex: "",
    },
  });

  const handleLetterSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex  mt-3 justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4"> Letter</h2>
        <form onSubmit={handleSubmit(handleLetterSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ minWidth: 180 }}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("letter")}
                  render={({ field: { onChange, value } }) => (
                    <FormControl
                      fullWidth
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "var(--primary-color) !important",
                          fontFamily: "var(--font-family) !important",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "var(--primary-color) !important",
                            color: "var(--primary-color) !important",
                            fontFamily: "var(--font-family) !important",
                          },
                          "&:hover fieldset": {
                            borderColor: "var(--primary-color) !important",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "var(--primary-color) !important",
                            fontFamily: "var(--font-family) !important",
                          },
                        },
                      }}
                    >
                      <InputLabel id="letter">Select Letter</InputLabel>
                      <Select
                        labelId="letter"
                        id="letter"
                        value={value}
                        label="Select Letter"
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("letter");
                        }}
                      >
                        <MenuItem value="appointmentLetter">
                          Appointment letter
                        </MenuItem>
                        <MenuItem value="relievingLetter">
                          Relieving letter
                        </MenuItem>
                        <MenuItem value="experienceLetter">
                          Experience letter
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                {errors.letter?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("date")}
                render={({ field: { onChange, value } }) => (
                  //   <LocalizationProvider dateAdapter={AdapterDayjs}>
                  //     <DemoContainer components={["DatePicker"]}>
                  //       <DatePicker
                  //         label="Select Date"
                  //         value={value || null}
                  //         onChange={(e) => {
                  //           onChange(e);
                  //           clearErrors("date");
                  //         }}
                  //       />
                  //     </DemoContainer>
                  //   </LocalizationProvider>
                  <InputField
                    value={value}
                    type="date"
                    label=""
                    placeholder=""
                    name="date"
                    aria-invalid={errors.date ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("date");
                    }}
                  />
                )}
              />
              {errors.date?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("referenceNo")}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    type="text"
                    label="Reference No"
                    placeholder="Reference No"
                    name="referenceNo"
                    aria-invalid={errors.referenceNo ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("referenceNo");
                    }}
                  />
                )}
              />
              {errors.referenceNo?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
          </Grid>
          {/* <div className="mt-4 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                "&.MuiButton-root": {
                  margin: "0px !important",
                },
              }}
            >
              Genrate
            </Button>
          </div> */}

          <div className="w-full mt-3">
            <label>Mail context:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("mailContex")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("mailContex");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.mailContex?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <label>Upload Signature: </label>

            <input
              type="file"
              accept="image/*"
              // onChange={handleSignatureUpload}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="contained" color="primary">
              Genrate offer letter
            </Button>
            <Button variant="contained" color="primary" type="submit">
              send mail
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmpolyeeLetter;
