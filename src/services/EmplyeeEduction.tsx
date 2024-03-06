import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

interface IAddEduactionData {
  employeeId: string | undefined;
  degree: string;
  institute: string;
  startDate: string;
  endDate: string;
  percentage: string;
}

interface IUpdateEduction {
  deleteFlag: boolean;
}
// Get Employee Eduction List
export const GetEmployeeEductionList = async (id: string) => {
  const url = parseTemplate(Endpoint.Employee.Get_EductionList).expand({ id });
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in GetEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Post Employee Eduction  Deatils
export const PostEmployeeEduction = async (data: IAddEduactionData) => {
  const url = Endpoint.Employee.Post_Eduction;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in GetEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Post Employee Salary Deatils By Id
export const PutEmployeeEduction = async (
  id: string,
  data: IUpdateEduction
) => {
  const url = parseTemplate(Endpoint.Employee.Put_Eduction).expand({ id });
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in GetEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
