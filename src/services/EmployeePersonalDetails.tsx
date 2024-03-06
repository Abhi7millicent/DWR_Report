import { parseTemplate } from "url-template";
import { Endpoint } from "./API/EndPoint";
import axios from "axios";

interface PersonalDetailsData {
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContact1: string;
  relation1: string;
  emergencyContact2: string;
  relation2: string;
}

export const GetEmployeePersonalDeatilsById = async (id: string) => {
  const url = parseTemplate(
    Endpoint.Employee.Get_PesonalDetailByEmployeeId
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

export const PutEmployeePersonalDeatilsById = async (
  id: string,
  salaryData: PersonalDetailsData
) => {
  const url = parseTemplate(
    Endpoint.Employee.Put_PesonalDetailByEmployeeId
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
