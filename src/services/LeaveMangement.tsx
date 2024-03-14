import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

export const PostLeaveMangement = async (data: any) => {
  const url = Endpoint.Leave.Post_ById;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in posting document:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const GetLeaveMangement = async (id: string) => {
  const url = parseTemplate(Endpoint.Leave.Get_ById).expand({
    id,
  });

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in posting document:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

//  Get All Request Leave
export const GetAllRequestLeave = async () => {
  const url = Endpoint.Leave.Get_AllRequestLeave;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error get  all request:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
//  Post Approve Leave
export const PostApproveLeave = async (id: string) => {
  const url = parseTemplate(Endpoint.Leave.Post_ApproveLeave).expand({ id });

  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error get  all request:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
//  Post Reaject Leave
export const PostRejectLeave = async (id: string) => {
  const url = parseTemplate(Endpoint.Leave.Post_RejectLeave).expand({ id });

  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error get  all request:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
