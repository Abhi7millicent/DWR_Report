import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router";
import InputField from "../../../components/InputField/InputField";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchEmployeeDataSuccess } from "../../../features/appointmentLetterSlice";
import {
  useGetEmployeeById,
  usePutEmployeeById,
} from "../../../hook/querie/useEmployeeQueries";

const EditDetails: React.FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
    clearErrors,
    setValue,
    register,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      reporting: "",
      role: "",
      loginId: "",
    },
  });

  const { id } = useParams();
  // const params = useParams();
  const dispatch = useDispatch();

  // const employeeId = id ? id : "";

  const {
    data: getEmployeeData,
    isLoading,
    isError,
  } = useGetEmployeeById(id !== undefined ? id : "");

  const { mutateAsync: updateEmployee, isLoading: UpdateEmployeeIsLoading } =
    usePutEmployeeById();

  useEffect(() => {
    if (!isLoading && !isError && getEmployeeData) {
      setValue("firstName", getEmployeeData.data.firstName);
      setValue("middleName", getEmployeeData.data.middleName);
      setValue("lastName", getEmployeeData.data.lastName);
      setValue("email", getEmployeeData.data.email);
      setValue("reporting", getEmployeeData.data.reporting); // You may need to set reporting if it's not part of getEmployeeData
      setValue("role", getEmployeeData.data.role);
      dispatch(
        fetchEmployeeDataSuccess({
          firstName: getEmployeeData.data.firstName,
          lastName: getEmployeeData.data.lastName,
          email: getEmployeeData.data.email,
          role: getEmployeeData.data.role,
        })
      );
    }
  }, [isLoading, isError, getEmployeeData]);

  // useEffect(() => {
  //   const fetchEmployeeData = async () => {
  //     dispatch(fetchDataStart());
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8080/api/DWR/employee/${id}`
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("data", data);
  //         const { firstName, lastName, email, role } = data;
  //         setValue("firstName", data.firstName);
  //         setValue("middleName", data.middleName);
  //         setValue("lastName", data.lastName);
  //         setValue("email", data.email);
  //         setValue("reporting", data.reporting);
  //         setValue("role", data.role);
  //         dispatch(
  //           fetchEmployeeDataSuccess({ firstName, lastName, email, role })
  //         );
  //       } else {
  //         const error = await response.json(); // Assuming error response contains JSON
  //         dispatch(fetchDataFailure(error.message));
  //         console.error("Failed to fetch employee data:", error.message);
  //       }
  //     } catch (error: any) {
  //       dispatch(fetchDataFailure(error.message));
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchEmployeeData();
  // }, [id]);

  const onSubmit = async (data: any) => {
    if (!id) {
      console.error("Error: id is undefined");
      return;
    }

    const requestData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      reporting: data.reporting,
    };

    try {
      await updateEmployee({ id: id, empdata: requestData });

      toast.success("Employee details updated successfully!", {
        position: "top-center",
        style: {
          fontFamily: "var(--font-family)",
          fontSize: "14px",
        },
        iconTheme: {
          primary: "var(--primary-color)",
          secondary: "#fff",
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update employee details. Please try again.", {
        style: {
          fontFamily: "var(--font-family)",
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toaster reverseOrder={false} />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="edit-details-content"
            id="edit-details-header"
          >
            <Typography>Edit Employee Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  {...register("firstName")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="First Name*"
                      placeholder="First Name*"
                      name="firstName"
                      aria-invalid={errors.firstName ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("firstName");
                      }}
                    />
                  )}
                />
                {errors.firstName?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  {...register("middleName")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Middle Name*"
                      placeholder="Middle Name*"
                      name="middleName"
                      aria-invalid={errors.middleName ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("middleName");
                      }}
                    />
                  )}
                />
                {errors.middleName?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  {...register("lastName")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Last Name*"
                      placeholder="Last Name*"
                      name="lastName"
                      aria-invalid={errors.lastName ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("lastName");
                      }}
                    />
                  )}
                />
                {errors.lastName?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  {...register("email")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="email"
                      label="Email*"
                      placeholder="Email*"
                      name="email"
                      aria-invalid={errors.email ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("email");
                      }}
                    />
                  )}
                />
                {errors.email?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel
                    id="role"
                    sx={{
                      "&.MuiInputLabel-root": {
                        color: "var(--primary-color) !important",
                      },
                    }}
                  >
                    Role*
                  </InputLabel>
                  <Controller
                    control={control}
                    {...register("role")}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="role"
                        id="demo-simple-select"
                        label="Role*"
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
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="SoftwareEngineer">
                          Software Engineer
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.role && errors.role.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  {...register("reporting")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Reporting*"
                      placeholder="Reporting*"
                      name="reporting"
                      aria-invalid={errors.reporting ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("reporting");
                      }}
                    />
                  )}
                />
                {errors.reporting?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
          <div className="flex justify-end mr-4">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: UpdateEmployeeIsLoading
                  ? "rgb(156 163 175) !important"
                  : "var(--primary-color) !important",
              }}
              disabled={UpdateEmployeeIsLoading}
            >
              Update
            </Button>
          </div>
        </Accordion>
      </form>
    </div>
  );
};

export default EditDetails;
