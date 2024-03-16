import { parseTemplate } from "url-template";
import { Endpoint } from "./API/EndPoint";
import axios from "axios";
interface SalaryDetailsData {
  bankAccountName: string;
  ifscCode: string;
  accountNo: string;
  uanNo: string;
  epfoNo: string;
  panNo: string;
  annualSalary: string; // Assuming annualSalary and monthlySalary are numbers
  monthlySalary: string;
}
// Get Employee Salary Deatils By Id
export const GetEmployeeSalaryDeatilsById = async (id: string) => {
  const url = parseTemplate(
    Endpoint.Employee.Get_SalaryDeatilsByEmployeeId
  ).expand({
    id,
  });
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in GetEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Put Employee Salary Deatils By Id
export const PutEmployeeSalaryDeatilsById = async (
  id: string,
  salaryData: SalaryDetailsData
) => {
  const url = parseTemplate(
    Endpoint.Employee.Put_SalaryDeatilsByEmployeeId
  ).expand({
    id,
  });
  console.log(url, "url");

  try {
    const response = await axios.put(url, salaryData);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in UpdateEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
