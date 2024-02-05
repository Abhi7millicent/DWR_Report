import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router";

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
                <TextField
                  label="Address Line 1"
                  fullWidth
                  value={permanentAddress.addressLine1}
                  onChange={handleInputChange("addressLine1")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 2"
                  fullWidth
                  value={permanentAddress.addressLine2}
                  onChange={handleInputChange("addressLine2")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Pin Code"
                  fullWidth
                  value={permanentAddress.pinCode}
                  onChange={handleInputChange("pinCode")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  fullWidth
                  value={permanentAddress.city}
                  onChange={handleInputChange("city")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  fullWidth
                  value={permanentAddress.state}
                  onChange={handleInputChange("state")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Country"
                  fullWidth
                  value={permanentAddress.country}
                  onChange={handleInputChange("country")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Contact 1"
                  fullWidth
                  value={permanentAddress.contactno1}
                  onChange={handleInputChange("contactno1")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Contact 2"
                  fullWidth
                  value={permanentAddress.contactno2}
                  onChange={handleInputChange("contactno2")}
                />
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
                <TextField
                  label="Address Line 1"
                  fullWidth
                  value={temporaryAddress.addressLine1}
                  onChange={handleInputtemporaryChange("addressLine1")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address Line 2"
                  fullWidth
                  value={temporaryAddress.addressLine2}
                  onChange={handleInputtemporaryChange("addressLine2")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Pin Code"
                  fullWidth
                  value={temporaryAddress.pinCode}
                  onChange={handleInputtemporaryChange("pinCode")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  fullWidth
                  value={temporaryAddress.city}
                  onChange={handleInputtemporaryChange("city")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  fullWidth
                  value={temporaryAddress.state}
                  onChange={handleInputtemporaryChange("state")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Country"
                  fullWidth
                  value={temporaryAddress.country}
                  onChange={handleInputtemporaryChange("country")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Contact 1"
                  fullWidth
                  value={temporaryAddress.contactno1}
                  onChange={handleInputtemporaryChange("contactno1")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Contact 2"
                  fullWidth
                  value={temporaryAddress.contactno2}
                  onChange={handleInputtemporaryChange("contactno2")}
                />
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
