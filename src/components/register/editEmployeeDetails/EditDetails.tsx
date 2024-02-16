import React, { useEffect } from "react";
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
import { useForm, Controller } from "react-hook-form";

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
  // const [employeeData, setEmployeeData] = useState<EmployeeData>({
  //   firstName: "",
  //   middleName: "",
  //   lastName: "",
  //   email: "",
  //   role: "",
  //   reporting: "",
  //   loginId: "",
  //   password: "",
  // });

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
          // setEmployeeData(data);
          setValue("firstName", data.firstName);
          setValue("middleName", data.middleName);
          setValue("lastName", data.lastName);
          setValue("email", data.email);
          setValue("reporting", data.reporting);
          setValue("role", data.role);
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

  const onSubmit = async (data: any) => {
    console.log(data, "data");

    const requestData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      reporting: data.reporting,
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
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </Accordion>
      </form>
    </div>
  );
};

export default EditDetails;
