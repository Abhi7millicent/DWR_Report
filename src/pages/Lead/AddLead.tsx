import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import InputField from "../../components/InputField/InputField";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
}
type FormData = {
  firstName: string;
  lastName: string;
  role: string;
  contact: string;
  email: string;
  eduction: string;
  yearOfPassing: string;
  currentCTC: string;
  expectedCTC: string;
  experience: string;
  noticePeriod: string;
  currentLocation: string;
  hobbies: string;
  reference: string;
  yearOfExperience: string;
  eductionDeatils: {
    eductionName: string;
    yearOfPassing: string;
  }[];
  experienceDeatils: {
    orgName: string;
    role: string;
    startTime: string;
    endTime: string;
    yearOfExperience: string;
    jobDescription: string;
  }[];
};
function AddLead({ isOpen, onClose }: ModelProps) {
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
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      // role: "",
      contact: "",
      email: "",
      eduction: "",
      yearOfPassing: "",
      currentCTC: "",
      expectedCTC: "",
      experience: "",
      yearOfExperience: "",
      noticePeriod: "",
      currentLocation: "",
      hobbies: "",
      reference: "",
      eductionDeatils: [{ eductionName: "", yearOfPassing: "" }],
      experienceDeatils: [
        {
          orgName: "",
          role: "",
          startTime: "",
          endTime: "",
          yearOfExperience: "",
          jobDescription: "",
        },
      ],
    },
  });
  const [expanded, setExpanded] = useState<string | false>(false);
  const [category, setCategory] = useState("fresher");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experienceDeatils",
  });
  const handleLeadSubmit = (data: any) => {
    console.log(data);
    reset();
    onClose();
  };
  // Function to handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // useEffect(() => {
  //   const startTime = getValues(`experienceDeatils.${index}.startTime`);
  //   const endTime = getValues(`experienceDeatils.${index}.endTime`);

  //   if (startTime && endTime) {
  //     const startDate = new Date(startTime);
  //     const endDate = new Date(endTime);

  //     // Calculate the difference in years between the start and end dates
  //     const diffInYears = endDate.getFullYear() - startDate.getFullYear();

  //     // Update the yearOfExperience field with the calculated difference
  //     setValue(`experienceDeatils.${index}.yearOfExperience`, diffInYears);
  //   }
  // }, []);
  // const [data, setData] = useState<FormData[]>([]);
  // console.log(data);
  // console.log(watch(`experienceDeatils?.${index}?.endTime`));

  // useEffect(() => {
  //   fields.forEach((data, index) => {
  //     console.log(data, "data");

  //     const startTime = watch(`experienceDeatil.${index}.startTime`);
  //     const endTime = "2012-12-23";

  //     if (startTime && endTime) {
  //       const startDate = new Date(startTime);
  //       const endDate = new Date(endTime);

  //       const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  //       const totalMonths = Math.floor(
  //         diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
  //       ); // Calculating total months

  //       const years = Math.floor(totalMonths / 12); // Calculate years
  //       const months = totalMonths % 12; // Calculate remaining months

  //       console.log(years, months);

  //       // setValue(
  //       //   `experienceDetails.${index}.yearOfExperience`,
  //       //   `${years} years ${months} months`
  //       // );
  //     }
  //   });
  // }, [getValues, setValue]);
  return (
    <div className={`${modalClasses} z-10`}>
      <div className="flex items-center  mt-3 justify-center">
        <div className="bg-white p-8 shadow-md rounded-md ">
          <h2 className="text-2xl font-semibold mb-4">Add Lead</h2>
          <form onSubmit={handleSubmit(handleLeadSubmit)}>
            <Grid container alignItems="center" marginBottom={1}>
              <Grid item xs={12} sm={3}>
                <FormControlLabel
                  sx={{ color: "var( --primary-color) !important" }}
                  control={
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={category}
                      onChange={handleCategoryChange}
                    />
                  }
                  label="Select Category :"
                  labelPlacement="start" // Adjust label placement
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <FormControlLabel
                    value="fresher"
                    control={
                      <Radio
                        sx={{ color: "var( --primary-color) !important" }}
                      />
                    }
                    label="Fresher"
                  />
                  <FormControlLabel
                    value="experience"
                    control={
                      <Radio
                        sx={{ color: "var( --primary-color) !important" }}
                      />
                    }
                    label="Experience"
                  />
                </RadioGroup>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("firstName")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="firstName"
                      label="First Name"
                      placeholder=""
                      name="firstName"
                      aria-invalid={errors.firstName ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("firstName");
                      }}
                    />
                  )}
                />
                {errors.firstName?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("lastName")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      name="lastName"
                      aria-invalid={errors.lastName ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("lastName");
                      }}
                    />
                  )}
                />
                {errors.lastName?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("currentLocation")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Current Location"
                      placeholder="Current Location"
                      name="currentLocation"
                      aria-invalid={errors.currentLocation ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("currentLocation");
                      }}
                    />
                  )}
                />
                {errors.currentLocation?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "5px" }}>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("contact")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="Phone Number"
                      placeholder="Phone Number"
                      name="contact"
                      aria-invalid={errors.contact ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("contact");
                      }}
                    />
                  )}
                />
                {errors.contact?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("email")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Email"
                      placeholder="Email"
                      name="email"
                      aria-invalid={errors.email ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("email");
                      }}
                    />
                  )}
                />
                {errors.email?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("hobbies")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Hobbies"
                      placeholder="Hobbies"
                      name="hobbies"
                      aria-invalid={errors.hobbies ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("hobbies");
                      }}
                    />
                  )}
                />
                {errors.hobbies?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            </Grid>
            {category === "experience" && (
              <Grid container spacing={2} sx={{ marginTop: "5px" }}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("currentCTC")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Current CTC"
                        placeholder="Current CTC"
                        name="currentCTC"
                        aria-invalid={errors.currentCTC ? "true" : "false"}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("currentCTC");
                        }}
                      />
                    )}
                  />
                  {errors.currentCTC?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("expectedCTC")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Expected CTC"
                        placeholder="Expected CTC"
                        name="expectedCTC"
                        aria-invalid={errors.expectedCTC ? "true" : "false"}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("expectedCTC");
                        }}
                      />
                    )}
                  />
                  {errors.expectedCTC?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("noticePeriod")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Notice Period"
                        placeholder="Notice Period"
                        name="noticePeriod"
                        aria-invalid={errors.noticePeriod ? "true" : "false"}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("noticePeriod");
                        }}
                      />
                    )}
                  />
                  {errors.noticePeriod?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
              </Grid>
            )}
            <Grid container spacing={2} sx={{ marginTop: "5px" }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ minWidth: 180 }}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("reference")}
                    render={({ field: { onChange, value } }) => (
                      <FormControl
                        fullWidth
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
                        <InputLabel id="reference">Select Reference</InputLabel>
                        <Select
                          labelId="reference"
                          id="reference"
                          value={value}
                          label="Select Reference"
                          onChange={(e) => {
                            onChange(e);
                            clearErrors("reference");
                          }}
                        >
                          <MenuItem value="naukri">Naukri</MenuItem>
                          <MenuItem value="linkedin">Linkedin</MenuItem>
                          <MenuItem value="glassdoor">Glassdoor</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  {errors.reference?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Box>
              </Grid>
              {category === "experience" && (
                <Grid item xs={12} sm={4}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("yearOfExperience")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Experience"
                        placeholder="Experience"
                        name="yearOfExperience"
                        aria-invalid={
                          errors.yearOfExperience ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("yearOfExperience");
                        }}
                      />
                    )}
                  />
                  {errors.yearOfExperience?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
              )}
            </Grid>
            <div className="flex gap-3 mt-3">
              <label>Upload Resmune: </label>

              <input
                type="file"
                accept="image/*"
                // onChange={handleSignatureUpload}
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={onClose}
                variant="contained"
                sx={{ backgroundColor: "#8a878f !important" }}
              >
                close
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Add Details
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLead;
