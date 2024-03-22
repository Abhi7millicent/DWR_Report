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
import InputField from "../../../components/InputField/InputField";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchAddressDataSuccess } from "../../../features/appointmentLetterSlice";
import {
  useGetEmployeeAdressById,
  usePutEmployeeAddressById,
} from "../../../hook/querie/useEmployeeAddress";

const ViewAddressDetails: React.FC = () => {
  const { id } = useParams();

  const { data: GetEmployeeAdressByIdTemporaryData } = useGetEmployeeAdressById(
    "Temporary",
    String(id)
  );
  const { data: GetEmployeeAdressByIdPermanentData } = useGetEmployeeAdressById(
    "Permanent",
    String(id)
  );
  const {
    mutateAsync: PutEmployeeAddressTemporaryById,
    isLoading: PutEmployeeAddressTemporaryByIdIsLoading,
  } = usePutEmployeeAddressById();
  const {
    mutateAsync: PutEmployeeAddressPermanentById,
    isLoading: PutEmployeeAddressPermanentByIdIsLoading,
  } = usePutEmployeeAddressById();

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
      const response = await PutEmployeeAddressPermanentById({
        data: savePermanentData,
        addressType: "Permanent",
        id: String(id),
      });

      if (response) {
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
      const response = await PutEmployeeAddressTemporaryById({
        data: saveTemporaryData,
        addressType: "Temporary",
        id: String(id),
      });

      if (response) {
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
                      required: true,
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
                      required: true,
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
                      required: true,
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
                      required: true,
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
                      required: true,
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
                      required: true,
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  backgroundColor: PutEmployeeAddressPermanentByIdIsLoading
                    ? "rgb(156 163 175) !important"
                    : "var(--primary-color) !important",
                }}
                disabled={PutEmployeeAddressPermanentByIdIsLoading}
              >
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
                      required: true,
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
                      required: true,
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
                      required: true,
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
                      required: true,
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
                      required: true,
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
                      required: true,
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  backgroundColor: PutEmployeeAddressTemporaryByIdIsLoading
                    ? "rgb(156 163 175) !important"
                    : "var(--primary-color) !important",
                }}
                disabled={PutEmployeeAddressTemporaryByIdIsLoading}
              >
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
