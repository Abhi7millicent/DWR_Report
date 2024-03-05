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
import { useDispatch } from "react-redux";
import {
  fetchDataStart,
  fetchSalaryDataSuccess,
  fetchDataFailure,
} from "../../../features/appointmentLetterSlice";
import {
  useGetEmployeeSalaryDeatilsById,
  usePutEmployeeSalaryDeatilsById,
} from "../../../hook/querie/useEmployeeSalaryDeatils";

interface ISalaryDetails {
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
  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    setValue,
    handleSubmit,
  } = useForm<ISalaryDetails>({
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
  // const apiEndpoint = `http://localhost:8080/api/DWR/employeeSalary/update/${id}`;

  const { id } = useParams();
  const { data: GetEmployeeSalaryDeatilsByIdData } =
    useGetEmployeeSalaryDeatilsById(String(id));

  const { mutateAsync: PutEmployeeSalaryDeatilsById } =
    usePutEmployeeSalaryDeatilsById();
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch data from the API and set it to form fields
    const getSalaryData = GetEmployeeSalaryDeatilsByIdData?.data;

    if (getSalaryData) {
      setValue("bankAccountName", getSalaryData.bankAccountName || "");
      setValue("ifscCode", getSalaryData.ifscCode || "");
      setValue("accountNo", getSalaryData.accountNo || "");
      setValue("uan", getSalaryData.uanNo || "");
      setValue("epfoNo", getSalaryData.epfoNo || "");
      setValue("panNo", getSalaryData.panNo || "");
      setValue("annualSalary", getSalaryData.annualSalary || "");
      setValue("monthlySalary", getSalaryData.monthlySalary || "");

      // Dispatch action with salary data
      dispatch(
        fetchSalaryDataSuccess({
          annualSalary: getSalaryData.annualSalary,
          monthlySalary: getSalaryData.monthlySalary,
        })
      );
    }
  }, [GetEmployeeSalaryDeatilsByIdData]);

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

  const handleSalaryDetails = async (data: any) => {
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
      const response = await PutEmployeeSalaryDeatilsById({
        id: String(id),
        salaryData: salaryDetailsData,
      });

      if (response) {
        toast.success("Salary updated successfully!", {
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
        toast.error("Failed to update Salary details. Please try again.", {
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
          aria-controls="salary-details-content"
          id="salary-details-header"
        >
          <Typography>Salary Details</Typography>
        </AccordionSummary>
        <form onSubmit={handleSubmit(handleSalaryDetails)}>
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
          <div className="flex justify-end mr-4">
            <Button variant="contained" color="primary" type="submit">
              Save Salary Details
            </Button>
          </div>
        </form>
      </Accordion>
    </div>
  );
};

export default SalaryDetails;
