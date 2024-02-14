import React, { useState, useEffect } from "react";
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
import InputField from "../../InputField/InputField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface EmployeeData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
  reporting: string;
  loginId: string;
  password: string;
}

const EditDetails: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "",
    reporting: "",
    loginId: "",
    password: "",
  });
  console.log(employeeData.firstName, "employeeData");

  const {
    formState: { errors },
    handleSubmit,
    control,
    clearErrors,
  } = useForm<typeof employeeData>();

  const { id } = useParams();
  console.log(errors, "errors");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/DWR/employee/${id}`
        );

        if (response.ok) {
          const data: EmployeeData = await response.json();
          console.log("data", data);
          setEmployeeData(data);
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setEmployeeData((prevData) => ({
  //     ...prevData,
  //     [name as string]: value as string,
  //   }));
  // };

  // const handleSelectChange = (
  //   event: SelectChangeEvent<{ name?: string; value: unknown }>
  // ) => {
  //   const { name, value } = event.target;
  //   setEmployeeData((prevData) => ({
  //     ...prevData,
  //     [name as string]: { name, value },
  //   }));
  // };

  const onSubmit: SubmitHandler<typeof employeeData> = async () => {
    const requestData = {
      firstName: employeeData.firstName,
      middleName: employeeData.middleName,
      lastName: employeeData.lastName,
      email: employeeData.email,
      role: employeeData.role,
      reporting: employeeData.reporting,
      loginId: employeeData.loginId,
      password: employeeData.password,
    };

    console.log(requestData, "requestData");

    try {
      const response = await fetch(
        `http://localhost:8080/api/DWR/employee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        alert("Employee details updated successfully!");
      } else {
        alert("Failed to update employee details. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {/* <TextField
                label="First Name"
                fullWidth
                value={employeeData.firstName}
                onChange={handleChange}
                name="firstName"
                required
              /> */}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value || employeeData.firstName}
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
                  name="firstName"
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
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value || employeeData.middleName}
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
                  name="middleName"
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
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value || employeeData.lastName}
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
                  name="lastName"
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
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value || employeeData.email}
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
                  name="email"
                />
                {errors.email?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="role">Role*</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue={employeeData.role}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="role"
                        id="demo-simple-select"
                        label="Role*"
                        onChange={(e) => field.onChange(e.target.value)}
                        value={employeeData.role}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="softwareEngineer">
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
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value || employeeData.reporting}
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
                  name="reporting"
                />
                {errors.reporting?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </Accordion>
      </form>
    </div>
  );
};

export default EditDetails;
