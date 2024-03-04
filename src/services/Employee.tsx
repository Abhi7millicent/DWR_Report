import axios from "axios";
import { Endpoint } from "./API/EndPoint";

interface Employee {
  id: string;
}

interface EmployeeData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
  reporting: string;
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

export const GetEmployeeById = async (data: Employee) => {
  const id = data.id;
  const url = `${Endpoint.Employee.Get_ById}/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in GetEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const UpdateEmployeeById = async (
  empdata: EmployeeData,
  data: Employee
) => {
  const id = data.id;
  const url = `${Endpoint.Employee.Put_ById}/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in UpdateEmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
