import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../InputField/InputField";
import { Button, Grid, TextareaAutosize } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../App/store";
import { useEffect, useState } from "react";
import { Header, Footer } from "../../../layout/offerLetter/OfferLetter";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import loginBackground from "../../../assets/logo-color.png";
import axios from "axios";
import { usePostEmail } from "../../../hook/querie/useEmail";
import toast, { Toaster } from "react-hot-toast";
import { usePostGenerateOfferLetter } from "../../../hook/querie/useLetter";

interface IAppointmentLetter {
  letter: string;
  referenceNo: string;
  date: string;
  position: string;
  mailContext: string;
}

interface EmployeeData {
  addressLine1: string;
  addressLine2: string;
  annualSalary: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  monthlySalary: string;
  pinCode: string;
  role: string;
  state: string;
}

interface AppointmentLetterData {
  paragraph1: string;
  paragraph2: string;
  annualCompensation: string;
  templateData1: string;
  templateData2: string;
}

interface LetterProps {
  content1: string;
  content2: string;
  signature: File | null;
  name: string;
  date: string;
  addressLine1: string;
  addressLine2: string;
  referenceNo: string;
}

const AppointmentLetterPDF: React.FC<LetterProps> = ({
  content1,
  content2,
  addressLine1,
  addressLine2,
  name,
  date,
  signature,
  referenceNo,
}) => {
  return (
    <Document>
      <Page style={styles.page} wrap>
        {/* Header */}
        <Header />
        {/* Footer */}
        <Footer />
        {/* Watermark */}
        <View style={styles.watermarkContainer}>
          <Image style={styles.watermark} src={loginBackground} />
        </View>
        <View style={styles.content}>
          {/* Date Section */}
          <View style={styles.sectionDate}>
            <Text>Date: {date}.</Text>
          </View>
          {/* Reference Number Section */}
          <View style={styles.section}>
            <Text>Reference No: {referenceNo}</Text>
          </View>
          {/* Address Section */}
          <View style={styles.section}>
            <Text>Dear {name},</Text>
            <Text>{addressLine1}</Text>
            <Text>{addressLine2}</Text>
          </View>
          {/* Content Section 1 */}
          <View style={styles.section}>
            <Text>{content1}</Text>
          </View>
          {/* Signature Section */}
          <View style={styles.section}>
            {signature && (
              <Image
                style={styles.signature}
                src={URL.createObjectURL(signature)}
              />
            )}
            <Text>For Millicent Technologies.</Text>
            <Text>Nirav Mehta</Text>
          </View>
          {/* Content Section 2 */}
          <View style={styles.section}>
            <Text>{content2}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const EmployeeLetter: React.FC = () => {
  const {
    formState: { errors },
    control,
    clearErrors,
    register,
    watch,
    handleSubmit,
  } = useForm<IAppointmentLetter>({
    defaultValues: {
      date: "",
      position: "",
      referenceNo: "",
      letter: "",
      mailContext: "",
    },
  });

  const { data } = useSelector((state: RootState) => state.appointmentLetter);

  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [content1, setContent1] = useState("");
  const [name, setName] = useState("");
  const [content2, setContent2] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [appointmentLetter, setAppointmentLetter] = useState<Blob | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [contentData, setContentData] = useState<AppointmentLetterData>({
    paragraph1: "",
    paragraph2: "",
    annualCompensation: "",
    templateData1: "",
    templateData2: "",
  });

  const currentDate = new Date();
  //------------------------ React Query ----------------------//
  const { mutateAsync: PostEmail } = usePostEmail();
  const { mutateAsync: PostGenerateOfferLetter } = usePostGenerateOfferLetter();

  useEffect(() => {
    const day = ("0" + currentDate.getDate()).slice(-2);
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    setDate(formattedDate);
  }, [currentDate]);

  const fetchAppointmentData = async () => {
    try {
      const response = await axios.get<AppointmentLetterData>(
        "http://localhost:8080/api/DWR/appointmentletter/data"
      );
      setContentData(response.data);
      setContent1(`<b>Your appointment as ${employeeData?.role}.</b> \n
    ${response.data.paragraph1} \n
    <b>Job Title</b> \n
    You shall be designated as ${employeeData?.role} \n
    ${response.data.paragraph2} \n
    <b>Annual compensation</b> \n
    a. Your annual compensation including benefits, allowances, and perquisites, if any, 
    payable by the Company is INR ${employeeData?.annualSalary} per annum (Rupees ${employeeData?.monthlySalary} Only). \n
    ${response.data.templateData1} \n
    `);
      setContent2(`
    ${response.data.templateData2} 
    `);
    } catch (error) {
      console.error("Error fetching offer letter data:", error);
    }
  };

  useEffect(() => {
    setEmployeeData(data as EmployeeData);
  }, [data]);

  const handleLetterSubmit = async (data: IAppointmentLetter) => {
    let emailData = {
      email: employeeData?.email,
      name: employeeData?.firstName,
      subject: data.letter,
      body: data.mailContext,
      file: signature,
    };

    const formData = new FormData();
    for (const [key, value] of Object.entries(emailData)) {
      formData.append(key, value as string); // Ensure `value` is treated as string
    }

    try {
      const response = await PostEmail(formData);

      if (response) {
        toast.success("Employee letter send successfull!", {
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
    } catch (error) {}
  };

  // useEffect(() => {
  //   console.log("contentData:", contentData);
  //   setContent1(`<b>Your appointment as ${employeeData?.role}.</b> \n
  //   ${contentData.paragraph1} \n
  //   <b>Job Title</b> \n
  //   You shall be designated as ${employeeData?.role} \n
  //   ${contentData.paragraph2} \n
  //   <b>Annual compensation</b> \n
  //   a. Your annual compensation including benefits, allowances, and perquisites, if any,
  //   payable by the Company is INR ${employeeData?.annualSalary} per annum (Rupees ${employeeData?.monthlySalary} Only). \n
  //   ${contentData.templateData1} \n
  //   `);
  //   setContent2(`
  //   ${contentData.templateData2}
  //   `);
  // }, [contentData]);

  const handleChangeLetterType = (e: any) => {
    fetchAppointmentData();

    setAddress1(`${employeeData?.addressLine1},${employeeData?.addressLine2}`);
    setAddress2(`${employeeData?.city}.${employeeData?.pinCode}.`);
    setName(`${employeeData?.firstName} ${employeeData?.lastName}`);
  };

  const handleSignatureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSignature(file);
    }
  };

  // useEffect(() => {
  //   console.log("test1");
  //   (async () => {
  //     const generatePDF = async () => {
  //       try {
  //         console.log("test2");
  //         if (signature !== null && watch("letter") === "appointmentLetter") {
  //           console.log("test3");
  //           const appointmentLetterPDF = (
  //             <AppointmentLetterPDF
  //               content1={content1}
  //               content2={content2}
  //               addressLine1={address1}
  //               addressLine2={address2}
  //               name={name}
  //               date={date}
  //               signature={signature}
  //               referenceNo={watch("referenceNo")}
  //             />
  //           );
  //           console.log("test5");

  //           console.log("appointmentLetterPDF", appointmentLetterPDF);
  //           const pdfBlob = await pdf(appointmentLetterPDF).toBlob();

  //           console.log("PDF generated successfully");
  //           setAppointmentLetter(pdfBlob);
  //         }
  //       } catch (error) {
  //         console.error("Error generating PDF:", error);
  //       }
  //     };
  //     generatePDF();
  //   })();
  // }, [watch("letter"), signature]);

  // const downloadAppointmentLetter = () => {
  //   // Define the data object to be sent in the request body
  //   const requestData = {
  //     date: date,
  //     referanceNo: watch("referenceNo"),
  //     name: name,
  //     address1: address1,
  //     address2: address2,
  //     position: employeeData?.role,
  //     annualy: employeeData?.annualSalary,
  //     monthly: employeeData?.monthlySalary,
  //   };

  // Make a POST request using Axios and send data in the request body
  // axios({
  //   method: "post", // Assuming you want to send a POST request
  //   url: "http://localhost:8080/api/DWR/appointmentletter/download/1",
  //   data: requestData, // Send data in the request body
  //   responseType: "blob", // Set the response type to blob
  // })
  //     .then((response) => {
  //       // Create a blob object from the response data
  //       const blob = new Blob([response.data], { type: "application/docx" });

  //       // Create a URL for the blob object
  //       const url = window.URL.createObjectURL(blob);

  //       // Create a link element
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "appointment_letter.docx"; // Set the download attribute

  //       // Append the link to the document body and trigger the click event to initiate download
  //       document.body.appendChild(a);
  //       a.click();

  //       // Clean up by revoking the URL object
  //       window.URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error("Error downloading appointment letter:", error);
  //     });
  // };

  const handleGenerateOfferLetter = async (data: IAppointmentLetter) => {
    let letter = data.letter;
    let letterData = {
      DATE: date,
      REFERENCENO: data.referenceNo,
      NAME: employeeData?.firstName,
      ADDRESS1: employeeData?.addressLine1 ? employeeData?.addressLine1 : "",
      ADDRESS2: employeeData?.addressLine2 ? employeeData?.addressLine2 : "",
      POSITION: employeeData?.role,
      ANNUALY: employeeData?.annualSalary.toString(),
      MONTHLY: employeeData?.monthlySalary.toString(),
    };

    try {
      const response = await PostGenerateOfferLetter({
        type: letter,
        data: letterData,
      });

      if (response) {
        const blob = new Blob([response], { type: "application/docx" });

        // Create a URL for the blob object
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const a = document.createElement("a");
        a.href = url;
        a.download = "appointment_letter.docx"; // Set the download attribute

        // Append the link to the document body and trigger the click event to initiate download
        document.body.appendChild(a);
        a.click();

        // Clean up by revoking the URL object
        window.URL.revokeObjectURL(url);
      } else {
        toast.error("Letter not download!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Intner Server error!", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex  mt-3 justify-center">
      <Toaster reverseOrder={false} />
      <div className="bg-white p-8 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-1"> Letter</h2>
        <p className="mb-3">
          Employee Name: {employeeData?.firstName} {employeeData?.lastName}
        </p>
        <form onSubmit={handleSubmit(handleLetterSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ minWidth: 180 }}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("letter")}
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
                      <InputLabel id="letter">Select Letter</InputLabel>
                      <Select
                        labelId="letter"
                        id="letter"
                        value={value}
                        label="Select Letter"
                        onChange={(e) => {
                          onChange(e);
                          handleChangeLetterType(e);
                          clearErrors("letter");
                        }}
                      >
                        <MenuItem value="appointmentLetter">
                          Appointment letter
                        </MenuItem>
                        <MenuItem value="relievingLetter">
                          Relieving letter
                        </MenuItem>
                        <MenuItem value="experienceLetter">
                          Experience letter
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                {errors.letter?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Box>
            </Grid>
            {watch("letter") !== "appointmentLetter" && (
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  {...register("date")}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      value={value}
                      type="date"
                      label=""
                      placeholder=""
                      name="date"
                      aria-invalid={errors.date ? "true" : "false"}
                      onChange={(e) => {
                        onChange(e);
                        clearErrors("date");
                      }}
                    />
                  )}
                />
                {errors.date?.type === "required" && (
                  <p className="alert">This field is required</p>
                )}
              </Grid>
            )}
            <Grid item xs={12} sm={4}>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("referenceNo")}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    value={value}
                    type="text"
                    label="Reference No"
                    placeholder="Reference No"
                    name="referenceNo"
                    aria-invalid={errors.referenceNo ? "true" : "false"}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("referenceNo");
                    }}
                  />
                )}
              />
              {errors.referenceNo?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </Grid>
          </Grid>
          <div className="w-full mt-3">
            <label>Mail context:</label>
            <div className="border border-[#226d6dbf] w-full rounded-md">
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                {...register("mailContext")}
                render={({ field: { onChange, value } }) => (
                  <TextareaAutosize
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      clearErrors("mailContext");
                    }}
                    className="w-full p-3"
                  />
                )}
              />
              {errors.mailContext?.type === "required" && (
                <p className="alert">This field is required</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <label>Upload Signature: </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleSignatureUpload}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit(handleGenerateOfferLetter)}
            >
              Generate offer letter
            </Button>

            <Button variant="contained" color="primary" type="submit">
              Send mail
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    flexDirection: "column",
    position: "relative",
  },
  watermarkContainer: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  watermark: {
    width: 300,
    height: 200,
    opacity: 0.5,
    transform: "rotate(-45deg)",
  },
  content: {
    flexGrow: 1,
  },
  section: {
    marginVertical: 10,
    fontSize: 12,
  },
  sectionDate: {
    marginVertical: 10,
    fontSize: 12,
    alignItems: "flex-end",
  },
  signature: {
    width: 150,
    height: 50,
  },
});
export default EmployeeLetter;
