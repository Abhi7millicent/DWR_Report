import React, { useState, ChangeEvent, useEffect } from "react";
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

interface AddressDetails {
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  contactno1: string;
  contactno2: string;
}

const ViewAddressDetails: React.FC = () => {
  const { id } = useParams();
  // State for permanent address
  const [permanentAddress, setPermanentAddress] = useState<AddressDetails>({
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    contactno1: "",
    contactno2: "",
  });
  const [temporaryAddress, setTemporaryAddress] = useState<AddressDetails>({
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
    contactno1: "",
    contactno2: "",
  });

  const {
    formState: { errors },
    control,
    clearErrors,
    register,
  } = useForm({
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      pinCode: "",
      city: "",
      state: "",
      country: "",
      contactno1: "",
      contactno2: "",
    },
  });

  const fetchLocationPermanentAddressDetails = (pinCode: string) => {
    fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((response) => response.json())
      .then((data) => {
        const { District, State, Country } = data[0].PostOffice[0];
        setPermanentAddress((prevAddress) => ({
          ...prevAddress,
          city: District, // Update to match your state key
          state: State, // Update to match your state key
          country: Country, // Update to match your state key
        }));
      })
      .catch((error) =>
        console.error("Error fetching location details:", error)
      );
  };

  const fetchLocationTemporaryAddressDetails = (pinCode: string) => {
    fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((response) => response.json())
      .then((data) => {
        const { District, State, Country } = data[0].PostOffice[0];
        setTemporaryAddress((prevAddress) => ({
          ...prevAddress,
          city: District, // Update to match your state key
          state: State, // Update to match your state key
          country: Country, // Update to match your state key
        }));
      })
      .catch((error) =>
        console.error("Error fetching location details:", error)
      );
  };

  useEffect(() => {
    // Fetch data from the API and set it to form fields
    fetch(`http://localhost:8080/api/DWR/addressDetails/${"Permanent"}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPermanentAddress(data); // Assuming the API returns the data in the same shape as SalaryDetails
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  useEffect(() => {
    // Fetch data from the API and set it to form fields
    fetch(`http://localhost:8080/api/DWR/addressDetails/${"Temporary"}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTemporaryAddress(data); // Assuming the API returns the data in the same shape as SalaryDetails
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleInputChange =
    (field: keyof AddressDetails) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setPermanentAddress((prevAddress) => ({
        ...prevAddress,
        [field]: value,
      }));

      // Fetch location details when pin code changes
      if (field === "pinCode") {
        fetchLocationPermanentAddressDetails(value);
      }
    };

  const handleInputtemporaryChange =
    (field: keyof AddressDetails) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTemporaryAddress((prevAddress) => ({
        ...prevAddress,
        [field]: value,
      }));

      // Fetch location details when pin code changes
      if (field === "pinCode") {
        fetchLocationTemporaryAddressDetails(value);
      }
    };

  const handleSavePermanent = () => {
    console.log("permanentAddress:", permanentAddress);
    fetch(
      `http://localhost:8080/api/DWR/addressDetails/update/${"Permanent"}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify(permanentAddress),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Permanent address details saved:", data);
      })
      .catch((error) => {
        console.error("Error saving permanent address:", error);
      });
  };

  const handleSaveTemporary = () => {
    fetch(
      `http://localhost:8080/api/DWR/addressDetails/update/${"Temporary"}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify(temporaryAddress),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Permanent address details saved:", data);
      })
      .catch((error) => {
        console.error("Error saving permanent address:", error);
      });
  };

  return (
    <div>
      <div className="mt-4">
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
                  {...register("addressLine1")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Address Line 1"
                      placeholder="addressLine1"
                      name="addressLine1"
                      aria-invalid={errors.addressLine1 ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("addressLine1");
                      }}
                    />
                  )}
                />
                {errors.addressLine1?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("addressLine2")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Address Line 2"
                      placeholder="addressLine2"
                      name="addressLine2"
                      aria-invalid={errors.addressLine2 ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("addressLine2");
                      }}
                    />
                  )}
                />
                {errors.addressLine2?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("pinCode")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Pin code"
                      placeholder="Pin code"
                      name="pinCode"
                      aria-invalid={errors.pinCode ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("pinCode");
                      }}
                    />
                  )}
                />
                {errors.pinCode?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("city")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="City"
                      placeholder="City"
                      name="city"
                      aria-invalid={errors.city ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("city");
                      }}
                    />
                  )}
                />
                {errors.city?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("state")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="State"
                      placeholder="State"
                      name="state"
                      aria-invalid={errors.state ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("state");
                      }}
                    />
                  )}
                />
                {errors.city?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("country")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Country"
                      placeholder="Country"
                      name="country"
                      aria-invalid={errors.country ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("country");
                      }}
                    />
                  )}
                />
                {errors.country?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("contactno1")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="Contact 1"
                      placeholder="Contact 1"
                      name="contactno1"
                      aria-invalid={errors.contactno1 ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("contactno1");
                      }}
                    />
                  )}
                />
                {errors.contactno1?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("contactno2")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="Contact 2"
                      placeholder="Contact 2"
                      name="contactno2"
                      aria-invalid={errors.contactno2 ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("contactno2");
                      }}
                    />
                  )}
                />
                {errors.contactno2?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSavePermanent}
          >
            Save Permanent Address
          </Button>
        </Accordion>
      </div>
      <div className="mt-4">
        {/* Temporary Address Accordion */}
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
                  {...register("addressLine1")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Address Line 1"
                      placeholder="addressLine1"
                      name="addressLine1"
                      aria-invalid={errors.addressLine1 ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("addressLine1");
                      }}
                    />
                  )}
                />
                {errors.addressLine1?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("addressLine2")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Address Line 2"
                      placeholder="addressLine2"
                      name="addressLine2"
                      aria-invalid={errors.addressLine2 ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("addressLine2");
                      }}
                    />
                  )}
                />
                {errors.addressLine2?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("pinCode")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Pin code"
                      placeholder="Pin code"
                      name="pinCode"
                      aria-invalid={errors.pinCode ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("pinCode");
                      }}
                    />
                  )}
                />
                {errors.pinCode?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("city")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="City"
                      placeholder="City"
                      name="city"
                      aria-invalid={errors.city ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("city");
                      }}
                    />
                  )}
                />
                {errors.city?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("state")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="State"
                      placeholder="State"
                      name="state"
                      aria-invalid={errors.state ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("state");
                      }}
                    />
                  )}
                />
                {errors.city?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("country")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="text"
                      label="Country"
                      placeholder="Country"
                      name="country"
                      aria-invalid={errors.country ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("country");
                      }}
                    />
                  )}
                />
                {errors.country?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("contactno1")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="Contact 1"
                      placeholder="Contact 1"
                      name="contactno1"
                      aria-invalid={errors.contactno1 ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("contactno1");
                      }}
                    />
                  )}
                />
                {errors.contactno1?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("contactno2")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="number"
                      label="Contact 2"
                      placeholder="Contact 2"
                      name="contactno2"
                      aria-invalid={errors.contactno2 ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("contactno2");
                      }}
                    />
                  )}
                />
                {errors.contactno2?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveTemporary}
          >
            Save Temporary Address
          </Button>
        </Accordion>
      </div>
    </div>
  );
};

export default ViewAddressDetails;
