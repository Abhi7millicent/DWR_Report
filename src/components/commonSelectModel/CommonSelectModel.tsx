import { Button, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputField from "../InputField/InputField";

const CommonSelectModel = () => {
  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      TaskName: "",
    },
  });
  const onSubmitSelect = () => {};
  return (
    <div className="w-96">
      <h2 className="text-2xl font-semibold mb-2">Add role</h2>
      <form onSubmit={handleSubmit(onSubmitSelect)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              {...register("TaskName")}
              render={({ field: { onChange, value } }) => (
                <InputField
                  value={value}
                  type="text"
                  label="Task Name"
                  placeholder="Task Name"
                  name="TaskName"
                  aria-invalid={errors.TaskName ? "true" : "false"}
                  onChange={(e) => {
                    onChange(e);
                    clearErrors("TaskName");
                  }}
                />
              )}
            />
            {errors.TaskName?.type === "required" && (
              <p className="alert">This field is required</p>
            )}
          </Grid>
        </Grid>
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => {
              reset();
            }}
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
          <Button variant="contained" color="primary" type="submit">
            Add role
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommonSelectModel;
