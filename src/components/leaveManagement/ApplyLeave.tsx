import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";
import { useParams } from "react-router";

import toast from "react-hot-toast";
import { GetSessionItem } from "../../utils/SessionStorage";
import { usePostLeaveMangement } from "../../hook/querie/useLeaveMangement";
import InputField from "../InputField/InputField";
import { Controller, useForm } from "react-hook-form";

interface ModalProps {
  balanced: number;
  isOpen: boolean;
  onClose: () => void;
  refetchData: () => void;
}
interface IApplyLeaveData {
  leaveType: string;
  startDate: string;
  endDate: string;
  description: string;
}
const ApplyLeave: React.FC<ModalProps> = ({
  balanced,
  isOpen,
  onClose,
  refetchData,
}) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center "
    : "hidden";

  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    handleSubmit,
    reset,
  } = useForm<IApplyLeaveData>({
    defaultValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });
  //react query

  const { mutateAsync: PostLeaveMangement } = usePostLeaveMangement();

  const { idp } = useParams();

  let id = GetSessionItem("id");

  if (id === idp) {
    id = idp;
  }

  const handleApplySubmit = async (data: IApplyLeaveData) => {
    // Calculate number of days based on start and end date
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const calculatedNumberOfDays = differenceInTime / (1000 * 3600 * 24) + 1; // Convert milliseconds to days
    const balancedLeave = balanced - calculatedNumberOfDays;

    // Prepare data to send
    const leaveData = {
      leaveType: data.leaveType,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      noOfDays: calculatedNumberOfDays,
      balancedLeave,
      employeeId: id,
    };

    try {
      // Send POST request using Axios
      const response = await PostLeaveMangement(leaveData);
      console.log("Leave application submitted successfully:", response);
      if (response) {
        toast.success("Leave application successfully!", {
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
        onClose();
        reset();
        refetchData();
      } else {
        toast.error("Leave application failed!", {
          position: "top-center",
        });
      }

      // Optionally, you can handle success here, like showing a success message to the user
    } catch (error) {
      console.error("Error submitting leave application:", error);
      toast.error("Sorry, you do not have sufficient leave balance.", {
        position: "top-center",
      });

      // Optionally, you can handle errors here, like showing an error message to the user
    }
  };
  const handleClose = () => {
    onClose();
    reset();
  };
  return (
    <div className={`${modalClasses} z-10`}>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-50">
          <Container>
            <Typography variant="h5" gutterBottom>
              Apply Leave
            </Typography>
            <form onSubmit={handleSubmit(handleApplySubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    {...register("leaveType")}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        select
                        label="Leave Type"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("leaveType");
                        }}
                        fullWidth
                        margin="normal"
                        sx={{
                          "& .MuiInputLabel-root": {
                            color: "var(--primary-color) !important",
                            fontFamily: "var(--font-family) !important",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "var(--primary-color) !important",
                              color: "var(--primary-color) !important",
                              fontFamily: "var(--font-family) !important",
                            },
                            "&:hover fieldset": {
                              borderColor: "var(--primary-color) !important",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--primary-color) !important",
                              fontFamily: "var(--font-family) !important",
                            },
                          },
                        }}
                      >
                        <MenuItem value="Sick">Sick Leave</MenuItem>
                        <MenuItem value="Vacation">Vacation Leave</MenuItem>
                        <MenuItem value="Personal">Personal Leave</MenuItem>
                      </TextField>
                    )}
                  />
                  {errors.leaveType?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={4} sx={{ marginTop: "15px" }}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    {...register("startDate")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label="Start Date"
                        type="date"
                        value={value}
                        required
                        name="Start Date"
                        placeholder="Start Date"
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                <Grid item xs={4} sx={{ marginTop: "15px" }}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    {...register("endDate")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label="End Date"
                        type="date"
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("endDate");
                        }}
                        name="End Date"
                        placeholder="End Date"
                      />
                    )}
                  />
                  {errors.endDate?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    {...register("description")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        type="text"
                        label="Description"
                        value={value}
                        name="Description"
                        placeholder="Description"
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("description");
                        }}
                        // margin="normal"
                      />
                    )}
                  />
                  {errors.description?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{
                      backgroundColor: "#fff !important",
                      color: "var( --primary-color) !important",
                      border: "2px solid var( --primary-color) !important",
                    }}
                  >
                    close
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
