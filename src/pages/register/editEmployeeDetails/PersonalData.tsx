import React, { useEffect } from "react";
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
import InputField from "../../../components/InputField/InputField";
import toast, { Toaster } from "react-hot-toast";

import {
  useGetEmployeePersonalDeatilsById,
  usePutEmployeePersonalDeatilsById,
} from "../../../hook/querie/useEmployeePersonalDetails";
// interface PersonalDataDetails {
//   dateOfBirth: string;
//   bloodGroup: string;
//   emergencyContact1: string;
//   relation1: string;
//   emergencyContact2: string;
//   relation2: string;
// }

const PersonalData: React.FC = () => {
  const { id } = useParams();
  const { data: GetPersonalDataDetails } = useGetEmployeePersonalDeatilsById(
    String(id)
  );

  const {
    mutateAsync: PutEmployeePersonalDeatilsById,
    isLoading: PutEmployeePersonalDeatilsByIdIsLoading,
  } = usePutEmployeePersonalDeatilsById();
  // const [formData, setFormData] = useState<PersonalDataDetails>({
  //   bloodGroup: "",
  //   emergencyContact1: "",
  //   relation1: "",
  //   emergencyContact2: "",
  //   relation2: "",
  // });
  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      dateOfBirth: "",
      bloodGroup: "",
      emergencyContact1: "",
      relation1: "",
      emergencyContact2: "",
      relation2: "",
    },
  });

  useEffect(() => {
    // Fetch data from the API and set it to form fields
    const fetchPersonalDetails = async () => {
      try {
        const response = GetPersonalDataDetails?.data;
        if (response) {
          setValue("dateOfBirth", response.dateOfBirth);
          setValue("bloodGroup", response.bloodGroup);
          setValue("emergencyContact1", response.emergencyContact1);
          setValue("relation1", response.relation1);
          setValue("emergencyContact2", response.emergencyContact2);
          setValue("relation2", response.relation2);
        } else {
          console.error("Failed to fetch address data");
          // setPermanentAddress(data); // Assuming the API returns the data in the same shape as SalaryDetails
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPersonalDetails();
  }, [GetPersonalDataDetails]);

  const onSubmit = async (data: any) => {
    const personalDetailsData = {
      dateOfBirth: data.dateOfBirth,
      bloodGroup: data.bloodGroup,
      emergencyContact1: data.emergencyContact1,
      relation1: data.relation1,
      emergencyContact2: data.emergencyContact2,
      relation2: data.relation2,
    };

    try {
      const response = await PutEmployeePersonalDeatilsById({
        id: String(id),
        personalData: personalDetailsData,
      });

      if (response) {
        toast.success("Personal detail updated successfully!", {
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
      } else {
        toast.error("Failed to update Personal  details. Please try again.", {
          style: {
            fontFamily: "var(--font-family)",
            fontSize: "14px",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Toaster reverseOrder={false} />{" "}
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  {...register("dateOfBirth")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="date"
                      label="Date Of Birth"
                      placeholder="Date Of Birth"
                      name="dateOfBirth"
                      aria-invalid={errors.dateOfBirth ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("dateOfBirth");
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
                    required: true,
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
                    required: true,
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
                    required: true,
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
          <div className="flex justify-end mr-4">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: PutEmployeePersonalDeatilsByIdIsLoading
                  ? "rgb(156 163 175) !important"
                  : "var(--primary-color) !important",
              }}
              disabled={PutEmployeePersonalDeatilsByIdIsLoading}
            >
              Save Personal Data
            </Button>
          </div>
        </form>
      </Accordion>
    </div>
  );
};

export default PersonalData;
