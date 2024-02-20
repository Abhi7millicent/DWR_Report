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
import InputField from "../../InputField/InputField";
import toast, { Toaster } from "react-hot-toast";

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
  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      bankAccountName: "",
      ifscCode: "",
      accountNo: "",
      uan: "",
      epfoNo: "",
      panNo: "",
      annualSalary: "",
      monthlySalary: "",
    },
  });
  const apiEndpoint = `http://localhost:8080/api/DWR/employeeSalary/update/${id}`;

  useEffect(() => {
    // Fetch data from the API and set it to form fields
    const fetchSalaryDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/DWR/employeeSalary/${id}`
        );
        if (response.ok) {
          const data: SalaryDetails = await response.json();
          console.log(data, "data");
          setValue("bankAccountName", data.bankAccountName);
          setValue("ifscCode", data.ifscCode);
          setValue("accountNo", data.accountNo);
          setValue("uan", data.uan);
          setValue("epfoNo", data.epfoNo);
          setValue("panNo", data.panNo);
          setValue("annualSalary", data.annualSalary);
          setValue("monthlySalary", data.monthlySalary);
        } else {
          console.error("Failed to fetch address data");
          // setPermanentAddress(data); // Assuming the API returns the data in the same shape as SalaryDetails
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSalaryDetails();
  }, [id]);
  // useEffect(() => {
  //   // Fetch data from the API and set it to form fields
  //   fetch(`http://localhost:8080/api/DWR/employeeSalary/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFormData(data); // Assuming the API returns the data in the same shape as SalaryDetails
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, [id]);

  // const handleInputChange =
  //   (field: keyof SalaryDetails) => (event: ChangeEvent<HTMLInputElement>) => {
  //     const value = event.target.value;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [field]: value,
  //     }));

  //     // Add logic to calculate monthly salary based on annual salary
  //     if (field === "annualSalary") {
  //       const monthlySalary = (parseFloat(value) / 12).toFixed(2);
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         monthlySalary,
  //       }));
  //     }
  //   };

  const onSubmit = async (data: any) => {
    const salaryDetailsData = {
      bankAccountName: data.bankAccountName,
      ifscCode: data.ifscCode,
      accountNo: data.accountNo,
      uan: data.uan,
      epfoNo: data.epfoNo,
      panNo: data.panNo,
      annualSalary: data.annualSalary,
      monthlySalary: data.monthlySalary,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salaryDetailsData),
      });

      if (response.ok) {
        toast.success("Salary updated successfully!", {
          position: "top-center",
          style: {
            fontFamily: "var(--font-family)",
          },
          iconTheme: {
            primary: "var(--primary-color)",
            secondary: "#fff",
          },
        });
      } else {
        toast.error("Failed to update Salary details. Please try again.", {
          style: {
            fontFamily: "var(--font-family)",
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
          aria-controls="salary-details-content"
          id="salary-details-header"
        >
          <Typography>Salary Details</Typography>
        </AccordionSummary>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Toaster reverseOrder={false} />{" "}
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("bankAccountName")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Bank Account Name"
                      placeholder="Bank Account Name"
                      name="bankAccountName"
                      aria-invalid={errors.bankAccountName ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("bankAccountName");
                      }}
                    />
                  )}
                />
                {errors.bankAccountName?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("ifscCode")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="IFSC Code"
                      placeholder="IFSC Code"
                      name="ifscCode"
                      aria-invalid={errors.ifscCode ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("ifscCode");
                      }}
                    />
                  )}
                />
                {errors.ifscCode?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("accountNo")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="Account Number"
                      placeholder="Account Number"
                      name="accountNo"
                      aria-invalid={errors.accountNo ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("accountNo");
                      }}
                    />
                  )}
                />
                {errors.accountNo?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("uan")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="UAN Number"
                      placeholder="UAN Number"
                      name="uan"
                      aria-invalid={errors.uan ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("uan");
                      }}
                    />
                  )}
                />
                {errors.uan?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("epfoNo")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="EPFO Number"
                      placeholder="EPFO Number"
                      name="epfoNo"
                      aria-invalid={errors.epfoNo ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("epfoNo");
                      }}
                    />
                  )}
                />
                {errors.epfoNo?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("panNo")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="PAN Number"
                      placeholder="PAN Number"
                      name="panNo"
                      aria-invalid={errors.panNo ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("panNo");
                      }}
                    />
                  )}
                />
                {errors.panNo?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("annualSalary")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="Annual Salary"
                      placeholder="Annual Salary"
                      name="annualSalary"
                      aria-invalid={errors.annualSalary ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("annualSalary");
                      }}
                    />
                  )}
                />
                {errors.annualSalary?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("monthlySalary")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="Monthly Salary"
                      placeholder="Monthly Salary"
                      name="monthlySalary"
                      aria-invalid={errors.monthlySalary ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("monthlySalary");
                      }}
                    />
                  )}
                />
                {errors.monthlySalary?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
          <Button variant="contained" color="primary" type="submit">
            Save Salary Details
          </Button>
        </form>
      </Accordion>
    </div>
  );
};

export default SalaryDetails;
