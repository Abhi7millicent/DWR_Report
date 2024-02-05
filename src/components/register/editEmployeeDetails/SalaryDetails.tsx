import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router";

interface SalaryDetails {
  bankAccountName: string;
  ifscCode: string;
  accountNo: string;
  uan: string;
  epfoNo: string;
  panNo: string;
  annualSalary: string;
  monthlySalary: string;
}

const SalaryDetails: React.FC = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<SalaryDetails>({
    bankAccountName: "",
    ifscCode: "",
    accountNo: "",
    uan: "",
    epfoNo: "",
    panNo: "",
    annualSalary: "",
    monthlySalary: "",
  });

  const apiEndpoint = `http://localhost:8080/api/DWR/employeeSalary/update/${id}`;

  useEffect(() => {
    // Fetch data from the API and set it to form fields
    fetch(`http://localhost:8080/api/DWR/employeeSalary/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data); // Assuming the API returns the data in the same shape as SalaryDetails
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleInputChange =
    (field: keyof SalaryDetails) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));

      // Add logic to calculate monthly salary based on annual salary
      if (field === "annualSalary") {
        const monthlySalary = (parseFloat(value) / 12).toFixed(2);
        setFormData((prevData) => ({
          ...prevData,
          monthlySalary,
        }));
      }
    };

  const handleSaveSalary = () => {
    // Similar logic to save data to API as in the previous example
    fetch(apiEndpoint, {
      method: "PUT", // Assuming you want to update data using a PUT request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((error) => console.error("Error saving data:", error));
  };

  return (
    <div className="mt-4">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="salary-details-content"
          id="salary-details-header"
        >
          <Typography>Salary Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Bank Account Name"
                fullWidth
                value={formData.bankAccountName}
                onChange={handleInputChange("bankAccountName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="IFSC Code"
                fullWidth
                value={formData.ifscCode}
                onChange={handleInputChange("ifscCode")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Account Number"
                fullWidth
                value={formData.accountNo}
                onChange={handleInputChange("accountNo")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="UAN Number"
                fullWidth
                value={formData.uan}
                onChange={handleInputChange("uan")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="EPFO Number"
                fullWidth
                value={formData.epfoNo}
                onChange={handleInputChange("epfoNo")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="PAN Number"
                fullWidth
                value={formData.panNo}
                onChange={handleInputChange("panNo")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Annual Salary"
                fullWidth
                value={formData.annualSalary}
                onChange={handleInputChange("annualSalary")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Monthly Salary"
                fullWidth
                value={formData.monthlySalary}
                onChange={handleInputChange("monthlySalary")}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <Button variant="contained" color="primary" onClick={handleSaveSalary}>
          Save Salary Details
        </Button>
      </Accordion>
    </div>
  );
};

export default SalaryDetails;
