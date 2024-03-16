import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

// Post DWR
export const PostDWR = async (data: FormData) => {
  const url = Endpoint.DWR.Post;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in post dwr:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Get DWR list Base On Date
export const GetDWRListBaseOnDate = async (
  employeeId: string,
  date: string
) => {
  const url = parseTemplate(Endpoint.DWR.Get_listBaseOnDate).expand({
    employeeId,
    date,
  });

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in get dwr:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Get DWR list
export const GetDWRList = async (employeeId: string) => {
  const url = parseTemplate(Endpoint.DWR.Get_List).expand({
    employeeId,
  });

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in get dwr:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Get DWR list Base On Range
export const GetDWRListBaseOnRange = async (
  employeeId: string,
  startDate: string,
  endDate: string
) => {
  const url = parseTemplate(Endpoint.DWR.Get_ListBaseOnRange).expand({
    employeeId,
    startDate,
    endDate,
  });

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in get dwr:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
