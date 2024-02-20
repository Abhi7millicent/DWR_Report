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

interface OfferLetterProps {
  content: string;
  signature: File | null;
  name: string;
  date: string;
}

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
  const [name, setName] = useState("");
  const [signature, setSignature] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [mail, setMail] = useState("");
  const [mailContext, setMailContext] = useState("");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false); // State to track PDF generation
  const [offerLetter, setOfferLetter] = useState<Blob | null>(null); // State to hold generated PDF
  const subject = "Offer Letter";

  const currentDate = new Date();

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

  return (
    <div className="flex items-center mt-3 justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Offer Letter</h2>
        <div>
          <div className="flex gap-4 w-full">
            <div>
              <TextField
                label="Candidate Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
    opacity: 0.4, // Adjust the opacity as needed
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
