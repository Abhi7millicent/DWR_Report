// import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import EditDetails from "./EditDetails";
import SalaryDetails from "./SalaryDetails";
import ViewAddressDetails from "./ViewAddressDetails";
import ViewDocuments from "./ViewDocumments";
import ViewEducationDetails from "./ViewEducationDetails";
import PersonalData from "./PersonalData";

const EditEmployeeDetails = () => {
  return (
    <div>
      <Tabs>
        <div className="px-5 mt-4">
          <TabList style={{ display: "flex", gap: "1rem" }}>
            <Tab
              style={{
                padding: "4px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              Details
            </Tab>

            <Tab
              style={{
                padding: "4px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              Educational Details
            </Tab>
            <Tab
              style={{
                padding: "4px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              Documents
            </Tab>
          </TabList>
        </div>

        <TabPanel>
          <h2>
            <div className="p-4">
              <EditDetails />
              <ViewAddressDetails />
              <SalaryDetails />
              <PersonalData />
            </div>
          </h2>
        </TabPanel>

        <TabPanel>
          <h2>
            {/* <EducationDetails /> */}
            <ViewEducationDetails />
          </h2>
        </TabPanel>
        <TabPanel>
          <h2>
            <ViewDocuments />
          </h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default EditEmployeeDetails;
