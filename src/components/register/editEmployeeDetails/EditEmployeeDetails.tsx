import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import EditDetails from "./EditDetails";
import Documents from "./Documents";
import SalaryDetails from "./SalaryDetails";

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
              Documents
            </Tab>
            <Tab
              style={{
                padding: "4px",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              Salary
            </Tab>
          </TabList>
        </div>

        <TabPanel>
          <h2>
            <EditDetails />
          </h2>
        </TabPanel>
        <TabPanel>
          <h2>
            <Documents />
          </h2>
        </TabPanel>
        <TabPanel>
          <h2>
            <SalaryDetails />
          </h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default EditEmployeeDetails;
