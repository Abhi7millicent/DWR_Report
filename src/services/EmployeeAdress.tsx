import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

export const GetEmployeeAdressById = async (
  id: string,
  addressType: string
) => {
  const url = parseTemplate(Endpoint.Employee.Get_employeeAdressById).expand({
    id,
    addressType,
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
