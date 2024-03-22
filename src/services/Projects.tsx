import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

interface IDeleteProject {
  deleteFlag: boolean;
}

interface IEditProject {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}
// Post Project
export const PostProject = async (data) => {
  const url = Endpoint.Projects.Post;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  add Project:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Get Project list
export const GetProjectList = async () => {
  const url = Endpoint.Projects.Get_List;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  get Project list:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Delete Project By Id
export const DeleteProjectById = async (id: string, data: IDeleteProject) => {
  const url = parseTemplate(Endpoint.Projects.Delete_ById).expand({ id });
  try {
    const response = await axios.patch(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  get Project list:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Get Project By Id
export const GetProjectById = async (id: string) => {
  const url = parseTemplate(Endpoint.Projects.Get_ById).expand({ id });
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  get Project By id:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
// Put Project By Id
export const PutProjectById = async (id: string, data: IEditProject) => {
  const url = parseTemplate(Endpoint.Projects.Put_ById).expand({ id });
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in  get Project By id:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
