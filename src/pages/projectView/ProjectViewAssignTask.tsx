import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

interface ModalProps {
  onClose: () => void;
}

interface ITaskData {
  TaskName: string;
  description: string;
}
const ProjectViewAssignTask: React.FC<ModalProps> = ({ onClose }) => {
  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      taskName: "",
      projectName: "",
      subTaskName: "",
    },
  });
  const [category, setCategory] = useState("project");
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const onSubmitTask = (data: any) => {
    console.log(data);
    onClose();
    reset();
  };
  return (
    <div className="w-[600px]">
      <h2 className="text-2xl font-semibold mb-2">Add Assign Task</h2>
      <form onSubmit={handleSubmit(onSubmitTask)}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              sx={{
                color: "var( --primary-color) !important",
                marginLeft: "0px !important",
              }}
              control={
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={category}
                  onChange={handleCategoryChange}
                />
              }
              label="Select Category :"
              labelPlacement="start" // Adjust label placement
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={category}
              onChange={handleCategoryChange}
            >
              <FormControlLabel
                value="project"
                control={
                  <Radio sx={{ color: "var( --primary-color) !important" }} />
                }
                label="Project"
              />
              <FormControlLabel
                value="task"
                control={
                  <Radio sx={{ color: "var( --primary-color) !important" }} />
                }
                label="Task"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {category === "project" ? (
            <Grid item xs={12} sm={6} sx={{ paddingTop: "0px !important" }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                {...register("projectName")}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    label="Project Name"
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("projectName");
                    }}
                    fullWidth
                    margin="normal"
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
                    <MenuItem value="dwr">DWR</MenuItem>
                    <MenuItem value="ces">CSE</MenuItem>
                    <MenuItem value="RDBrother">RD Brother</MenuItem>
                  </TextField>
                )}
              />
              {errors.projectName?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
          ) : (
            <Grid item xs={12} sm={6} sx={{ paddingTop: "0px !important" }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                {...register("taskName")}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    label="Task Name"
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("taskName");
                    }}
                    fullWidth
                    margin="normal"
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
                    <MenuItem value="login">Login</MenuItem>
                    <MenuItem value="register">Register</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                  </TextField>
                )}
              />
              {errors.taskName?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
          )}

          {category === "project" ? (
            <Grid item xs={12} sm={6} sx={{ paddingTop: "0px !important" }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                {...register("taskName")}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    label="Task Name"
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("taskName");
                    }}
                    fullWidth
                    margin="normal"
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
                    <MenuItem value="login">Login</MenuItem>
                    <MenuItem value="register">Register</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                  </TextField>
                )}
              />
              {errors.taskName?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
          ) : (
            <Grid item xs={12} sm={6} sx={{ paddingTop: "0px !important" }}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                {...register("subTaskName")}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    label="Sub Task Name"
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("subTaskName");
                    }}
                    fullWidth
                    margin="normal"
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
                    <MenuItem value="EmployeeDeatils">
                      Employee Deatils
                    </MenuItem>
                    <MenuItem value="letter"> Letter</MenuItem>
                    <MenuItem value="eduction">Eduction</MenuItem>
                  </TextField>
                )}
              />
              {errors.subTaskName?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
          )}
        </Grid>

        <div className="flex justify-between mt-2">
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
            Add assign task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectViewAssignTask;
