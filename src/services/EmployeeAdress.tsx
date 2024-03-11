import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

interface IAddressData {
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  contactno1: string;
  contactno2: string;
}
export const GetEmployeeAdressById = async (
  addressType: string,
  id: string
) => {
  const url = parseTemplate(Endpoint.Employee.Get_AdressByEmployeeId).expand({
    addressType,
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

// Put Employee Salary address By Id
export const PutEmployeeAddressById = async (
  data: IAddressData,
  addressType: string,
  id: string
) => {
  const url = parseTemplate(Endpoint.Employee.Put_EmployeeAdressById).expand({
    addressType,
    id,
  });

  console.log(url, "urlurlurlurl");

  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in put EmployeeById:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
