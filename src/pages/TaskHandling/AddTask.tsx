import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../components/InputField/InputField";

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
}
function AddTask({ isOpen, onClose }: ModelProps) {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center "
    : "hidden";

  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      selectTask: "",
      selectTaskAssign: "",
      schedule: "",
      description: "",
    },
  });
  const handleTaskSubmit = (data: any) => {
    console.log(data);
    reset();
    onClose();
  };
  return (
    <div className={`${modalClasses} z-10`}>
      <div className="flex items-center  mt-3 justify-center">
        <div className="bg-white p-8 shadow-md rounded-md ">
          <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
          <form onSubmit={handleSubmit(handleTaskSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ minWidth: 180 }}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("selectTask")}
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
                        <InputLabel id="selectTask">Select Task</InputLabel>
                        <Select
                          labelId="selectTask"
                          id="selectTask"
                          value={value}
                          label="Select Task"
                          onChange={(e) => {
                            onChange(e);
                            clearErrors("selectTask");
                          }}
                        >
                          <MenuItem value="interview">Interview</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  {errors.selectTask?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ minWidth: 180 }}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("selectTaskAssign")}
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
                        <InputLabel id="selectTaskAssign">
                          Select Task Assign
                        </InputLabel>
                        <Select
                          labelId="selectTaskAssign"
                          id="selectTaskAssign"
                          value={value}
                          label="Select Task Assign"
                          onChange={(e) => {
                            onChange(e);
                            clearErrors("selectTaskAssign");
                          }}
                        >
                          <MenuItem value="bsc">Mani</MenuItem>
                          <MenuItem value="MSC">Neha </MenuItem>
                          <MenuItem value="BCom">Abhi</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  {errors.selectTaskAssign?.type === "required" && (
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
                  {...register("schedule")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="date"
                      label=""
                      placeholder=""
                      name="schedule"
                      aria-invalid={errors.schedule ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("schedule");
                      }}
                    />
                  )}
                />
                {errors.schedule?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            </Grid>
            {/* <div className="mt-3">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("description")}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    type="text"
                    label="Description"
                    placeholder="Description"
                    name="description"
                    aria-invalid={errors.description ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("description");
                    }}
                  />
                )}
              />
              {errors.description?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div> */}
            <Grid container spacing={2} sx={{ marginTop: "2px" }}>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("schedule")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="time"
                      label=""
                      placeholder=""
                      name="schedule"
                      aria-invalid={errors.schedule ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("schedule");
                      }}
                    />
                  )}
                />
                {errors.schedule?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>

              <Grid item xs={12} sm={8}>
                <div className="border border-[#226d6dbf] w-full rounded-md">
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("description")}
                    render={({ field: { onChange, value } }) => (
                      <TextareaAutosize
                        value={value}
                        placeholder="Description"
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("description");
                        }}
                        className="w-full p-3"
                      />
                    )}
                  />
                  {errors.description?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </div>
              </Grid>
            </Grid>

            <div className="flex justify-between mt-3">
              <Button
                onClick={onClose}
                variant="contained"
                sx={{ backgroundColor: "#8a878f !important" }}
              >
                close
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Assign Task
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
