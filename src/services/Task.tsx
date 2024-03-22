import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

interface IDeleteTask {
  deleteFlag: boolean;
}

interface IEditTask {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}
// Post Task
export const PostTask = async (data) => {
  const url = Endpoint.Tasks.Post;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  add Task:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Get Task list
export const GetTaskList = async () => {
  const url = Endpoint.Tasks.Get_List;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  get Task list:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Delete Task By Id
export const DeleteTaskById = async (id: string, data: IDeleteTask) => {
  const url = parseTemplate(Endpoint.Tasks.Delete_ById).expand({ id });
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  get Task list:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Get Task By Id
export const GetTaskById = async (id: string) => {
  const url = parseTemplate(Endpoint.Tasks.Get_ById).expand({ id });
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  get Task By id:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Put Task By Id
export const PutTaskById = async (id: string, data: IEditTask) => {
  const url = parseTemplate(Endpoint.Tasks.Put_ById).expand({ id });
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  get Task By id:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
