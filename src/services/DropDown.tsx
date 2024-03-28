import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

interface IDropDownData {
  name: string;
}
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

export const PostRoleEmployeeList = async (data: IDropDownData) => {
  const url = Endpoint.DropDown.Post_RoleEmployee;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in Post role employee:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Get Task Type
export const GetTaskType = async () => {
  const url = Endpoint.DropDown.Get_TaskType;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in get Task Type:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Post Task Type

export const PostTaskType = async (data: IDropDownData) => {
  const url = Endpoint.DropDown.Post_TaskType;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in Post Task Type List:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
