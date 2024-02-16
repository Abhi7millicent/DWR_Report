import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../InputField/InputField";

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
  const {
    formState: { errors },
    control,
    clearErrors,
    register,
  } = useForm({
    defaultValues: {
      bloodGroup: "",
      emergencyContact1: "",
      relation1: "",
      emergencyContact2: "",
      relation2: "",
    },
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
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("bloodGroup")}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    type="text"
                    label="Blood Group"
                    placeholder="Blood Group"
                    name="bloodGroup"
                    aria-invalid={errors.bloodGroup ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("bloodGroup");
                    }}
                  />
                )}
              />
              {errors.bloodGroup?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("emergencyContact1")}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    type="number"
                    label="Emergency Contact No. 1"
                    placeholder="Emergency Contact No. 1"
                    name="emergencyContact1"
                    aria-invalid={errors.emergencyContact1 ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("emergencyContact1");
                    }}
                  />
                )}
              />
              {errors.emergencyContact1?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("relation1")}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    type="number"
                    label="Relation to Contact No. 1"
                    placeholder="Relation to Contact No. 1"
                    name="relation1"
                    aria-invalid={errors.relation1 ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("relation1");
                    }}
                  />
                )}
              />
              {errors.relation1?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("emergencyContact2")}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    type="number"
                    label="Emergency Contact No. 2"
                    placeholder="Emergency Contact No. 2"
                    name="emergencyContact2"
                    aria-invalid={errors.emergencyContact2 ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("emergencyContact2");
                    }}
                  />
                )}
              />
              {errors.emergencyContact2?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("relation2")}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    type="number"
                    label="Relation to Contact No. 2"
                    placeholder="Relation to Contact No. 2"
                    name="relation2"
                    aria-invalid={errors.relation2 ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("relation2");
                    }}
                  />
                )}
              />
              {errors.relation2?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
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
