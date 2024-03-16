// import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import EditDetails from "./EditDetails";
import SalaryDetails from "./SalaryDetails";
import ViewAddressDetails from "./ViewAddressDetails";
import ViewDocuments from "./ViewDocumments";
import ViewEducationDetails from "./ViewEducationDetails";
import PersonalData from "./PersonalData";

import EmpolyeeLetter from "./EmpolyeeLetter";
import SalarySlip from "./SalarySlip";
const EditEmployeeDetails = () => {
  return (
    <div>
      <Tabs>
        <div className="px-5 mt-4">
          <TabList style={{ display: "flex", gap: "1rem" }}>
            <Tab>Details</Tab>
            <Tab>Educational Details</Tab>
            <Tab>Documents</Tab>
            <Tab>Letter</Tab>
            <Tab>Salary slip</Tab>
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
        <TabPanel>
          <h2>
            <EmpolyeeLetter />
          </h2>
        </TabPanel>
        <TabPanel>
          <h2>
            <SalarySlip />
          </h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default EditEmployeeDetails;
