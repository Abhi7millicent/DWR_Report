import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

interface EmployeeData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
  reporting: string;
}
interface EmployeeRegisterData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
  confirmPassword: string;
  reporting: string;
  password: string;
}

export const GetEmployeeList = async () => {
  const url = Endpoint.Employee.Get_list;

  try {
    const response = await axios.get(url);
    return response.data; // Return the response data
  } catch (error) {
    // Handle errors
    console.error("Error in GetEmployeeList:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const GetEmployeeById = async (id: string) => {
  const url = parseTemplate(Endpoint.Employee.Get_ById).expand({ id });
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in GetEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const PutEmployeeById = async (
  empdata: EmployeeData,
  employee_id: string
) => {
  const id = employee_id;
  const url = parseTemplate(Endpoint.Employee.Put_ById).expand({ id });
  console.log("url:", url);
  try {
    const response = await axios.put<EmployeeData>(url, empdata);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in updateEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const PostEmployeeRegister = async (data: EmployeeRegisterData) => {
  const url = Endpoint.Employee.Post_Register;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in post Employee By Id:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
