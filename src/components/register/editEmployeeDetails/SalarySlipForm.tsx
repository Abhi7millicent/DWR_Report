import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, Button } from "@mui/material";
import InputField from "../../InputField/InputField";

interface FormValues {
  basicDA: number;
  leave: number;
  hra: number;
  conveyance: number;
  loan: number;
  professionTax: number;
  tdsIt: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalarySlipForm: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center "
    : "hidden";
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission here
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`${modalClasses} z-10`}>
      <div className="bg-white p-8 shadow-md rounded-md ">
        <h2 className="text-2xl font-semibold mb-4">Add Salary Slip</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                name="basicDA"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label="Basic & DA"
                    placeholder="Basic & DA"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                name="leave"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label="leave"
                    placeholder="leave"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                name="hra"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label="HRA"
                    placeholder="HRA"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                name="conveyance"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label="Conveyance"
                    placeholder="Conveyance"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                name="loan"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label="Loan"
                    placeholder="Loan"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                name="professionTax"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label="ProfessionTax"
                    placeholder="ProfessionTax"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                name="tdsIt"
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="number"
                    label="TdsIt"
                    placeholder="TdsIt"
                  />
                )}
              />
            </Grid>
          </Grid>
          <div className="flex justify-between mt-4">
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                backgroundColor: "#fff !important",
                color: "var( --primary-color) !important",
                border: "2px solid var( --primary-color) !important",
              }}
            >
              close
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Add Salary Slip
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalarySlipForm;
