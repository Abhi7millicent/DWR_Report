import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";
import { useParams } from "react-router";
import axios from "axios"; // Import Axios

const ApplyLeave: React.FC<{ balanced: number }> = ({ balanced }) => {
  const [leaveType, setLeaveType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  // const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const { id } = useParams();

  const handleLeaveTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLeaveType(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Calculate number of days based on start and end date
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const calculatedNumberOfDays = differenceInTime / (1000 * 3600 * 24) + 1; // Convert milliseconds to days
    const balancedLeave = balanced - calculatedNumberOfDays;
    console.log("balancedLeave:", balancedLeave);

    // useEffect  (() =>{
    //   setNumberOfDays(calculatedNumberOfDays);
    // },[calculatedNumberOfDays]);

    // console.log("numberOfDays:",numberOfDays);

    // Prepare data to send
    const data = {
      leaveType,
      description,
      startDate,
      endDate,
      noOfDays: calculatedNumberOfDays,
      balancedLeave,
    };

    try {
      // Send POST request using Axios
      const response = await axios.post(
        `http://localhost:8080/api/DWR/leavemanagement/save/${id}`,
        data
      );
      console.log("Leave application submitted successfully:", response.data);
      // Optionally, you can handle success here, like showing a success message to the user
    } catch (error) {
      console.error("Error submitting leave application:", error);
      // Optionally, you can handle errors here, like showing an error message to the user
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md w-50">
          <Container>
            <Typography variant="h5" gutterBottom>
              Apply Leave
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    select
                    label="Leave Type"
                    value={leaveType}
                    onChange={handleLeaveTypeChange}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="sick">Sick Leave</MenuItem>
                    <MenuItem value="vacation">Vacation Leave</MenuItem>
                    <MenuItem value="personal">Personal Leave</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
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