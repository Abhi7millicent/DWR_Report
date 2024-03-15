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
// Get DWR list
export const GetDWRList = async (employeeId: string, date: string) => {
  const url = parseTemplate(Endpoint.DWR.Get_list).expand({ employeeId, date });

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in post dwr:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
