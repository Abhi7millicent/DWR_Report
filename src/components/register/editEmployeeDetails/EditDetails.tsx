import React, { useState, useEffect, FormEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router";

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

  const { id } = useParams();

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name as string]: value as string,
    }));
  };

  // const handleSelectChange = (
  //   event: SelectChangeEvent<{ name?: string; value: unknown }>
  // ) => {
  //   const { name, value } = event.target;
  //   setEmployeeData((prevData) => ({
  //     ...prevData,
  //     [name as string]: { name, value },
  //   }));
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
              <TextField
                label="First Name"
                fullWidth
                value={employeeData.firstName}
                onChange={handleChange}
                name="firstName"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Middle Name"
                fullWidth
                value={employeeData.middleName}
                onChange={handleChange}
                name="middleName"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Last Name"
                fullWidth
                value={employeeData.lastName}
                onChange={handleChange}
                name="lastName"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={employeeData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="role">Role*</InputLabel>
                <Select
                  labelId="role"
                  id="demo-simple-select"
                  value={employeeData.role}
                  label="Role*"
                  onChange={handleChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="softwareEngineer">
                    Software Engineer
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Reporting"
                fullWidth
                value={employeeData.reporting}
                onChange={handleChange}
                name="reporting"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Accordion>
    </div>
  );
};

export default EditDetails;
