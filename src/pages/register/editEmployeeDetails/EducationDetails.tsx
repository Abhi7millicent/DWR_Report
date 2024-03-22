import React, { useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Button, Grid } from "@mui/material";
import { usePostEmployeeEduction } from "../../../hook/querie/useEmployeeEduction";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../../components/InputField/InputField";
interface ModalProps {
  onClose: () => void;
  refetchData: () => void;
}

interface IEductionDeatilsData {
  degree: string;
  institute: string;
  startDate: string;
  endDate: string;
  percentage: string;
}
const EducationDetails: React.FC<ModalProps> = ({ onClose, refetchData }) => {
  const { id } = useParams();

  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      degree: "",
      institute: "",
      startDate: "",
      endDate: "",
      percentage: "",
    },
  });

  const {
    mutateAsync: PostEmployeeEduction,
    isLoading: PostEmployeeEductionIsLoading,
  } = usePostEmployeeEduction();

  const onSubmitEductionDetails = async (data: IEductionDeatilsData) => {
    const educationData = {
      employeeId: id,
      degree: data.degree,
      institute: data.institute,
      startDate: data.startDate,
      endDate: data.endDate,
      percentage: data.percentage,
    };
    try {
      // Send data to the API using Axios
      const response = await PostEmployeeEduction(educationData);

      if (response) {
        toast.success("Employee details updated successfully!", {
          position: "top-center",
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
          iconTheme: {
            primary: "var(--primary-color)",
            secondary: "#fff",
          },
        });
      }
      // alert("Educational Details Inserted");
      refetchData();
      reset();
      onClose();
      // Optionally, you can handle the response or perform other actions after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleClose = () => {
    onClose();
    reset();
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Add Education Details</h2>
      <form onSubmit={handleSubmit(onSubmitEductionDetails)} autoComplete="off">
        <Grid container spacing={2} alignItems="center" marginBottom={2} mt={1}>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              {...register("degree")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Degree"
                  placeholder="Degree"
                  name="degree"
                  aria-invalid={errors.degree ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("degree");
                  }}
                />
              )}
            />
            {errors.degree?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              {...register("institute")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Institute"
                  placeholder="Institute"
                  name="institute"
                  aria-invalid={errors.institute ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("institute");
                  }}
                />
              )}
            />
            {errors.institute?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              {...register("startDate")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="date"
                  label="Start date"
                  placeholder="Start date"
                  name="startDate"
                  aria-invalid={errors.startDate ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("startDate");
                  }}
                />
              )}
            />
            {errors.startDate?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              {...register("endDate")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="date"
                  label="End Date"
                  placeholder="End Date"
                  name="endDate"
                  aria-invalid={errors.endDate ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("endDate");
                  }}
                />
              )}
            />
            {errors.endDate?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              {...register("percentage")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="number"
                  label="Percentage"
                  placeholder="Percentage"
                  name="percentage"
                  aria-invalid={errors.percentage ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("percentage");
                  }}
                />
              )}
            />
            {errors.percentage?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
        </Grid>

        <div className="flex justify-between">
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#fff !important",
              color: "var( --primary-color) !important",
              border: "2px solid var( --primary-color) !important",
              marginLeft: "0px !important",
            }}
          >
            close
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              backgroundColor: PostEmployeeEductionIsLoading
                ? "rgb(156 163 175) !important"
                : "var(--primary-color) !important",
            }}
            disabled={PostEmployeeEductionIsLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EducationDetails;
