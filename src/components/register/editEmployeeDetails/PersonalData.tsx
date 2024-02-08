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

interface PersonalDataDetails {
  bloodGroup: string;
  emergencyContact1: string;
  relation1: string;
  emergencyContact2: string;
  relation2: string;
}

const PersonalData: React.FC = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<PersonalDataDetails>({
    bloodGroup: "",
    emergencyContact1: "",
    relation1: "",
    emergencyContact2: "",
    relation2: "",
  });

  //   const apiEndpoint = `http://localhost:8080/api/DWR/personalData/update/${id}`;
  const apiEndpoint = `http://localhost:8080/api/DWR/employeePersonalDetails/update/${id}`;

  useEffect(() => {
    // Fetch data from the API and set it to form fields
    fetch(`http://localhost:8080/api/DWR/employeePersonalDetails/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data); // Assuming the API returns the data in the same shape as PersonalDataDetails
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleInputChange =
    (field: keyof PersonalDataDetails) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };

  const handleSavePersonalData = () => {
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
          aria-controls="personal-data-content"
          id="personal-data-header"
        >
          <Typography>Personal Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Blood Group"
                fullWidth
                value={formData.bloodGroup}
                onChange={handleInputChange("bloodGroup")}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Emergency Contact No. 1"
                fullWidth
                value={formData.emergencyContact1}
                onChange={handleInputChange("emergencyContact1")}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Relation to Contact No. 1"
                fullWidth
                value={formData.relation1}
                onChange={handleInputChange("relation1")}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Emergency Contact No. 2"
                fullWidth
                value={formData.emergencyContact2}
                onChange={handleInputChange("emergencyContact2")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Relation to Contact No. 2"
                fullWidth
                value={formData.relation2}
                onChange={handleInputChange("relation2")}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSavePersonalData}
        >
          Save Personal Data
        </Button>
      </Accordion>
    </div>
  );
};

export default PersonalData;
