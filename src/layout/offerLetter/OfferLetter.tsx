import React, { useEffect, useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import loginBackground from "../../assets/logo-color.png";
import address from "../../assets/navigate.png";
import mailIcon from "../../assets/mail.png";
import contactIcon from "../../assets/address.png";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { pdf } from "@react-pdf/renderer"; // Import pdf function from react-pdf
import InputField from "../../components/InputField/InputField";

import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
interface OfferLetterData {
  id?: number;
  companyName?: string;
  companyWebsite?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraph4?: string;
  paragraph5?: string;
  gmail1?: string;
  gmail2?: string | null;
  contact1?: string;
  contact2?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
}

interface OfferLetterProps {
  content: string;
  signature: File | null;
  name: string;
  date: string;
}
// const {
//   formState: { errors },
//   control,
//   clearErrors,
//   register,
// } = useForm<OfferLetterProps>({
//   defaultValues: {
//     content: "",
//     name: "",
//   },
// });

export const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} src={loginBackground} />
      <View>
        <Text style={styles.headerText}>MILLICENT TECHNOLOGIES</Text>
        <Text style={styles.companyAddress}>www.millicent.in</Text>
      </View>
    </View>
  );
};

export const Footer: React.FC = () => (
  <View style={styles.footer}>
    <View style={styles.details}>
      <View style={styles.details1}>
        <Image style={styles.logo1} src={mailIcon} />
        <View style={styles.details2}>
          <Text> info@millicent.in</Text>
        </View>
      </View>
      <View style={styles.details1}>
        <Image style={styles.logo1} src={contactIcon} />
        <View style={styles.details2}>
          <Text> 9819441177</Text>
          <Text> 9820431177</Text>
        </View>
      </View>
      <View style={styles.details1}>
        <Image style={styles.logo1} src={address} />
        <View style={styles.details2}>
          <Text> 514 Gold Crest Business Center,</Text>
          <Text> Opposite Manubhai Jewellers.</Text>
          <Text> LT Road,Borivali W. 400092.</Text>
        </View>
      </View>
    </View>
    <View>
      <Text style={styles.footerText}>Page </Text>
      <Text
        style={styles.footerText}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </View>
  </View>
);

const OfferLetterPDF: React.FC<OfferLetterProps> = ({
  content,
  name,
  date,
  signature,
}) => {
  return (
    <Document>
      <Page style={styles.page} wrap>
        <Header />
        <View style={styles.watermarkContainer}>
          <Image style={styles.watermark} src={loginBackground} />
        </View>
        <View style={styles.content}>
          <View style={styles.sectionDate}>
            <Text>Date: {date}.</Text>
          </View>
          <View style={styles.section}>
            <Text>Dear {name},</Text>
          </View>
          <View style={styles.section}>
            <Text>{content}</Text>
          </View>
          <View style={styles.section}>
            <Text>Millicent Technologies</Text>
          </View>
          <View style={styles.section}>
            <Text>
              {signature && (
                <Image
                  style={styles.signature}
                  src={URL.createObjectURL(signature)}
                />
              )}
            </Text>
            <Text>Nirav Mehta</Text>
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

const OfferLetter: React.FC = () => {
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [signature, setSignature] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [mail, setMail] = useState("");
  const [mailContext, setMailContext] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false); // State to track PDF generation
  const [offerLetter, setOfferLetter] = useState<Blob | null>(null); // State to hold generated PDF
  const subject = "Offer Letter";

  const currentDate = new Date();

  const [offerLetterData, setOfferLetterData] = useState<OfferLetterData>({
    companyName: "",
    companyWebsite: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    paragraph4: "",
    paragraph5: "",
    gmail1: "",
    gmail2: null,
    contact1: "",
    contact2: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<OfferLetterData>(
          "http://localhost:8080/api/DWR/offerlettertemplate/data"
        );
        setOfferLetterData(response.data);
      } catch (error) {
        console.error("Error fetching offer letter data:", error);
      }
    };

    fetchData();
  }, []);

  const genrateContent = async () => {
    setContent(`I am pleased to extend to you an offer of employment as a ${position} at Millicent Technologies.
${offerLetterData.paragraph1} \n
Position: ${position} \n
Start Date: ${startDate} \n
Salary: ${salary} per annum \n
${offerLetterData.paragraph2}\n
${offerLetterData.paragraph3} ${startDate} ${offerLetterData.paragraph4} \n
${offerLetterData.paragraph5}`);
  };

  useEffect(() => {
    const day = ("0" + currentDate.getDate()).slice(-2);
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    setDate(formattedDate);
  }, [currentDate]);

  const handleSignatureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSignature(file);
    }
  };

  useEffect(() => {
    const offerLetterPDF = (
      <OfferLetterPDF
        content={content}
        name={name}
        date={date}
        signature={signature}
      />
    );

    const pdfBlob = pdf(offerLetterPDF).toBlob(); // Convert PDF to Blob

    pdfBlob.then((blob) => {
      if (signature !== null && name !== "" && content !== "") {
        setIsGeneratingPDF(true); // Stop PDF generation
        setOfferLetter(blob); // Set the generated PDF to state
      } else {
        setIsGeneratingPDF(false);
      }
    });
  }, [name, content, signature]);

  const handleSendEmail = () => {
    const apiUrl: string = "http://localhost:8080/api/DWR/Email/send";

    // Check if offerLetter is not null
    if (offerLetter) {
      // Create a FileReader object
      const reader = new FileReader();

      // Define onload event handler
      reader.onload = () => {
        // Get the data URL string
        const dataURL: string = reader.result as string;

        // Extract the base64-encoded attachment from the data URL
        const base64EncodedAttachment: string = dataURL.split(",")[1];

        // Construct email data object with the base64-encoded attachment
        const emailData = {
          to: mail,
          subject: subject,
          body: mailContext,
          name: name,
          attachment: base64EncodedAttachment, // Assign base64-encoded attachment
        };

        console.log("emailData:", emailData);

        // Send email using fetch API
        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        })
          .then((response: Response) => {
            if (!response.ok) {
              throw new Error("Failed to send email");
            }
            console.log("Email sent successfully");
          })
          .catch((error: Error) => {
            console.error("Error sending email:", error);
          });
      };

      // Read offerLetter Blob as Data URL
      reader.readAsDataURL(offerLetter);
    } else {
      console.error("Offer letter is null");
    }
  };
  // const handleDateChange = (date: any) => {
  //   setSelectedDate(date);
  //   // Do whatever you want with the selected date here
  // };
  // console.log(selectedDate?.$d, "selectedDate");

  return (
    <div className="flex items-center mt-3 justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Offer Letter</h2>
        <div>
          <div className="flex gap-4 w-full">
            {/* <div>
              <TextField
                label="Candidate Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  value={selectedDate}
                  renderInput={(params: any) => <TextField {...params} />}
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider> */}

            <div>
              <InputField
                value={name}
                type="text"
                label="Candidate Name"
                placeholder="Candidate Name"
                name="candidate Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <InputField
                value={position}
                type="text"
                label="Position"
                placeholder="Position"
                name="position"
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div>
              <InputField
                value={salary}
                type="text"
                label="Salary"
                placeholder="Salary"
                name="salary"
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div>
              <InputField
                value={startDate}
                type="date"
                label=""
                placeholder="MM/DD/YYYY"
                name="startDate"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(e) => setStartDate(e)}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
            </div>
            <div className="mt-2">
              <Button variant="contained" onClick={genrateContent}>
                Genrate
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full">
              <label>Offer Letter Content:</label>
              <div className="border-b border-gray-400 w-full rounded-md">
                <TextareaAutosize
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label>Upload Signature: </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleSignatureUpload}
            />
          </div>
          <div>
            <div className="flex mt-4 gap-4">
              <div>
                <TextField
                  label="Candidate mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label>Mail context:</label>
                <div className="border-b border-gray-400 w-full rounded-md">
                  <TextareaAutosize
                    value={mailContext}
                    onChange={(e) => setMailContext(e.target.value)}
                    className="w-full p-2"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="contained" onClick={handleSendEmail}>
                Send Email
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <PDFDownloadLink
              document={
                <OfferLetterPDF
                  content={content}
                  name={name}
                  date={date}
                  signature={signature}
                />
              }
              fileName="OfferLetter.pdf"
            >
              {/* {({ loading }) => (loading ? "Generating PDF..." : "")} */}
            </PDFDownloadLink>
          </div>
          {/* Conditionally render the offer letter link if PDF is generated */}
          {!isGeneratingPDF && <p>Generate offer letter...</p>}
          {isGeneratingPDF && offerLetter && (
            <a
              href={URL.createObjectURL(offerLetter)}
              download="OfferLetter.pdf"
            >
              Download Offer Letter
            </a>
          )}
        </div>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4E8989",
  },
  companyAddress: {
    fontSize: 12,
    width: 200,
  },
  footerText: {
    fontSize: 12,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    padding: 70,
  },
  details1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details2: {
    paddingRight: 10,
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
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 150,
    height: 50,
  },
  logo1: {
    width: 20,
    height: 20,
  },
  signatureContainer: {
    alignSelf: "flex-end",
  },
  signature: {
    width: 150,
    height: 50,
  },
  watermarkContainer: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1, // Adjust the opacity as needed
    justifyContent: "center",
    alignItems: "center",
  },
  watermark: {
    width: 300,
    height: 200,
    opacity: 0.5,
    transform: "rotate(-45deg)", // Rotate the watermark if needed
  },
});

export default OfferLetter;
