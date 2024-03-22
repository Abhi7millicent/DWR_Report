import axios from "axios";
import { Endpoint } from "./API/EndPoint";

// Get Employee List
export const GetRoleEmployeeList = async () => {
  const url = Endpoint.DropDown.Get_RoleEmployee;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in get employee:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Post role Employee List
export const PostRoleEmployeeList = async () => {
  const url = Endpoint.DropDown.Post_RoleEmployee;

  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in Post role employee:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
