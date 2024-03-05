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
import InputField from "../../InputField/InputField";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  fetchDataStart,
  fetchAddressDataSuccess,
  fetchDataFailure,
} from "../../../features/appointmentLetterSlice";
import { useGetEmployeeAdressById } from "../../../hook/querie/useEmployeeAddress";

// interface PermanentAddressDetails {
//   addressLine1: string;
//   addressLine2: string;
//   pinCode: string;
//   city: string;
//   state: string;
//   country: string;
//   contactno1: string;
//   contactno2: string;
// }
// interface TemporaryAddressDetails {
//   addressLine1: string;
//   addressLine2: string;
//   pinCode: string;
//   city: string;
//   state: string;
//   country: string;
//   contactno1: string;
//   contactno2: string;
// }

const ViewAddressDetails: React.FC = () => {
  const { id } = useParams();

  // State for permanent address
  // const [permanentAddress, setPermanentAddress] = useState<AddressDetails>({
  //   addressLine1: "",
  //   addressLine2: "",
  //   pinCode: "",
  //   city: "",
  //   temporaryState: "",
  //   country: "",
  //   contactno1: "",
  //   contactno2: "",
  // });
  // const [temporaryAddress, setTemporaryAddress] = useState<AddressDetails>({
  //   addressLine1: "",
  //   addressLine2: "",
  //   pinCode: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   contactno1: "",
  //   contactno2: "",
  // });
  const { data: GetEmployeeAdressByIdTemporaryData } = useGetEmployeeAdressById(
    String(id),
    "Temporary"
  );
  const { data: GetEmployeeAdressByIdPermanentData } = useGetEmployeeAdressById(
    String(id),
    "Permanent"
  );

  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      permanentAddressLine1: "",
      permanentAddressLine2: "",
      permanentPinCode: "",
      permanentCity: "",
      permanentState: "",
      permanentCountry: "",
      permanentContactno1: "",
      permanentContactno2: "",
      temporaryAddressLine2: "",
      temporaryAddressLine1: "",
      temporaryPinCode: "",
      temporaryCity: "",
      temporaryState: "",
      temporaryCountry: "",
      temporaryContactno1: "",
      temporaryContactno2: "",
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const EmployeeAdressByIdPermanentData =
      GetEmployeeAdressByIdPermanentData?.data;

    if (EmployeeAdressByIdPermanentData) {
      setValue(
        "permanentAddressLine1",
        EmployeeAdressByIdPermanentData.addressLine1
      );
      setValue(
        "permanentAddressLine2",
        EmployeeAdressByIdPermanentData.addressLine2
      );
      setValue("permanentPinCode", EmployeeAdressByIdPermanentData.pinCode);
      setValue("permanentCity", EmployeeAdressByIdPermanentData.city);
      setValue("permanentState", EmployeeAdressByIdPermanentData.state);
      setValue("permanentCountry", EmployeeAdressByIdPermanentData.country);
      setValue(
        "permanentContactno1",
        EmployeeAdressByIdPermanentData.contactno1
      );
      setValue(
        "permanentContactno2",
        EmployeeAdressByIdPermanentData.contactno2
      );
      dispatch(
        fetchAddressDataSuccess({
          addressLine1: EmployeeAdressByIdPermanentData.addressLine1,
          addressLine2: EmployeeAdressByIdPermanentData.addressLine1,
          pinCode: EmployeeAdressByIdPermanentData.pinCode,
          city: EmployeeAdressByIdPermanentData.city,
          state: EmployeeAdressByIdPermanentData.state,
          country: EmployeeAdressByIdPermanentData.country,
        })
      );
    }
  }, [GetEmployeeAdressByIdPermanentData]);

  useEffect(() => {
    // Fetch data from the API and set it to form fields
    const EmployeeAdressByIdTemporaryData =
      GetEmployeeAdressByIdTemporaryData?.data;
    if (EmployeeAdressByIdTemporaryData) {
      setValue(
        "temporaryAddressLine1",
        EmployeeAdressByIdTemporaryData.addressLine1
      );
      setValue(
        "temporaryAddressLine2",
        EmployeeAdressByIdTemporaryData.addressLine2
      );
      setValue("temporaryPinCode", EmployeeAdressByIdTemporaryData.pinCode);
      setValue("temporaryCity", EmployeeAdressByIdTemporaryData.city);
      setValue("temporaryState", EmployeeAdressByIdTemporaryData.state);
      setValue("temporaryCountry", EmployeeAdressByIdTemporaryData.country);
      setValue(
        "temporaryContactno1",
        EmployeeAdressByIdTemporaryData.contactno1
      );
      setValue(
        "temporaryContactno2",
        EmployeeAdressByIdTemporaryData.contactno2
      );
    }
  }, [GetEmployeeAdressByIdTemporaryData]);

  const onSubmitPermanent = async (data: any) => {
    const savePermanentData = {
      addressLine1: data.permanentAddressLine1,
      addressLine2: data.permanentAddressLine2,
      pinCode: data.permanentPinCode,
      city: data.permanentCity,
      state: data.permanentState,
      country: data.permanentCountry,
      contactno1: data.permanentContactno1,
      contactno2: data.permanentContactno2,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/DWR/addressDetails/update/${"Permanent"}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(savePermanentData),
        }
      );

      if (response.ok) {
        // alert("Employee details updated successfully!");
        toast.success("Address updated successfully!", {
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
        // setDisabled(false);
      } else {
        toast.error("Failed to update Address details. Please try again.", {
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
        });
        // setDisabled(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // fetch(
    //   `http://localhost:8080/api/DWR/addressDetails/update/${"Permanent"}/${id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       // Add any other headers as needed
    //     },
    //     body: JSON.stringify(permanentAddress),
    //   }
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Permanent address details saved:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error saving permanent address:", error);
    //   });
  };

  const onSubmitTemporary = async (data: any) => {
    // fetch(
    const saveTemporaryData = {
      addressLine1: data.temporaryAddressLine1,
      addressLine2: data.temporaryAddressLine2,
      pinCode: data.temporaryPinCode,
      city: data.temporaryCity,
      state: data.temporaryState,
      country: data.temporaryCountry,
      contactno1: data.temporaryContactno1,
      contactno2: data.temporaryContactno2,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/DWR/addressDetails/update/${"Temporary"}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveTemporaryData),
        }
      );

      if (response.ok) {
        // alert("Employee details updated successfully!");
        toast.success("Address updated successfully!", {
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
        // setDisabled(false);
      } else {
        toast.error("Failed to update Address details. Please try again.", {
          style: {
            fontFamily: "var( --font-family)",
            fontSize: "14px",
          },
        });
        // setDisabled(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    //   `http://localhost:8080/api/DWR/addressDetails/update/${"Temporary"}/${id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       // Add any other headers as needed
    //     },
    //     body: JSON.stringify(temporaryAddress),
    //   }
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Permanent address details saved:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error saving permanent address:", error);
    //   });
  };

  return (
    <div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmitPermanent)}>
          <Toaster reverseOrder={false} />{" "}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="permanent-address-content"
              id="permanent-address-header"
            >
              <Typography>Permanent Address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* <TextField
                  label="Address Line 1"
                  fullWidth
                  value={permanentAddress.addressLine1}
                  onChange={handleInputChange("addressLine1")}
                /> */}
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("permanentAddressLine1")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Address Line 1"
                        placeholder="permanentAddressLine1"
                        name="permanentAddressLine1"
                        aria-invalid={
                          errors.permanentAddressLine1 ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("permanentAddressLine1");
                        }}
                      />
                    )}
                  />
                  {errors.permanentAddressLine1?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("permanentAddressLine2")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Address Line 2"
                        placeholder="permanentAddressLine2"
                        name="permanentAddressLine2"
                        aria-invalid={
                          errors.permanentAddressLine2 ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("permanentAddressLine2");
                        }}
                      />
                    )}
                  />
                  {errors.permanentAddressLine2?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("permanentPinCode")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Pin code"
                        placeholder="Pin code"
                        name="permanentPinCode"
                        aria-invalid={
                          errors.permanentPinCode ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("permanentPinCode");
                          // fetchLocationPermanentAddressDetails();
                        }}
                      />
                    )}
                  />
                  {errors.permanentPinCode?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("permanentCity")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="City"
                        placeholder="City"
                        name="permanentCity"
                        aria-invalid={errors.permanentCity ? "true" : "false"}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("permanentCity");
                        }}
                      />
                    )}
                  />
                  {errors.permanentCity?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("permanentState")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="State"
                        placeholder="State"
                        name="permanentState"
                        aria-invalid={errors.permanentState ? "true" : "false"}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("permanentState");
                        }}
                      />
                    )}
                  />
                  {errors.permanentState?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("permanentCountry")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Country"
                        placeholder="Country"
                        name="permanentCountry"
                        aria-invalid={
                          errors.permanentCountry ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("permanentCountry");
                        }}
                      />
                    )}
                  />
                  {errors.permanentCountry?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("permanentContactno1")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="number"
                        label="Contact 1"
                        placeholder="Contact 1"
                        name="permanentContactno1"
                        aria-invalid={
                          errors.permanentContactno1 ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("permanentContactno1");
                        }}
                      />
                    )}
                  />
                  {errors.permanentContactno1?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("permanentContactno2")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="number"
                        label="Contact 2"
                        placeholder="Contact 2"
                        name="permanentContactno2"
                        aria-invalid={
                          errors.permanentContactno2 ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("permanentContactno2");
                        }}
                      />
                    )}
                  />
                  {errors.permanentContactno2?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>
            <div className="flex justify-end mr-4">
              <Button variant="contained" color="primary" type="submit">
                Save Permanent Address
              </Button>
            </div>
          </Accordion>
        </form>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmitTemporary)}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="temporary-address-content"
              id="temporary-address-header"
            >
              <Typography>Temporary Address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("temporaryAddressLine1")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Address Line 1"
                        placeholder="temporaryAddressLine1"
                        name="temporaryAddressLine1"
                        aria-invalid={
                          errors.temporaryAddressLine1 ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("temporaryAddressLine1");
                        }}
                      />
                    )}
                  />
                  {errors.temporaryAddressLine1?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("temporaryAddressLine2")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Address Line 2"
                        placeholder="temporaryAddressLine2"
                        name="temporaryAddressLine2"
                        aria-invalid={
                          errors.temporaryAddressLine2 ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("temporaryAddressLine2");
                        }}
                      />
                    )}
                  />
                  {errors.temporaryAddressLine2?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("temporaryPinCode")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Pin code"
                        placeholder="Pin code"
                        name="temporaryPinCode"
                        aria-invalid={
                          errors.temporaryPinCode ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("temporaryPinCode");
                        }}
                      />
                    )}
                  />
                  {errors.temporaryPinCode?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("temporaryCity")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="City"
                        placeholder="City"
                        name="temporaryCity"
                        aria-invalid={errors.temporaryCity ? "true" : "false"}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("temporaryCity");
                        }}
                      />
                    )}
                  />
                  {errors.temporaryCity?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("temporaryState")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="State"
                        placeholder="State"
                        name="temporaryState"
                        aria-invalid={errors.temporaryState ? "true" : "false"}
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("temporaryState");
                        }}
                      />
                    )}
                  />
                  {errors.temporaryState?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("temporaryCountry")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="text"
                        label="Country"
                        placeholder="Country"
                        name="temporaryCountry"
                        aria-invalid={
                          errors.temporaryCountry ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("temporaryCountry");
                        }}
                      />
                    )}
                  />
                  {errors.temporaryCountry?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("temporaryContactno1")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="number"
                        label="Contact 1"
                        placeholder="Contact 1"
                        name="temporaryContactno1"
                        aria-invalid={
                          errors.temporaryContactno1 ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("temporaryContactno1");
                        }}
                      />
                    )}
                  />
                  {errors.temporaryContactno1?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    {...register("temporaryContactno2")}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        value={value}
                        type="number"
                        label="Contact 2"
                        placeholder="Contact 2"
                        name="temporaryContactno2"
                        aria-invalid={
                          errors.temporaryContactno2 ? "true" : "false"
                        }
                        onChange={(e) => {
                          onChange(e);
                          clearErrors("temporaryContactno2");
                        }}
                      />
                    )}
                  />
                  {errors.temporaryContactno2?.type === "required" && (
                    <p className="alert">This field is required</p>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>
            <div className="flex justify-end mr-4">
              <Button variant="contained" color="primary" type="submit">
                Save Temporary Address
              </Button>
            </div>
          </Accordion>
        </form>
        {/* Temporary Address Accordion */}
      </div>
    </div>
  );
};

export default ViewAddressDetails;
