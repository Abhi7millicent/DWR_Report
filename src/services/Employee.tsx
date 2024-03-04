import axios from "axios";
import { Endpoint } from "./API/EndPoint";

export async function GetEmployeeList() {
  const url = Endpoint.Employee;

  try {
    const response = await axios.get(url);
    return response.data; // Return the response data
  } catch (error) {
    // Handle errors
    console.error("Error in getEmployee:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
