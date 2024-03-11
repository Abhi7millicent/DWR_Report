import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

interface IUpdateLetter {}

export const Postletter = async (type: string, data: IUpdateLetter) => {
  const url = parseTemplate(Endpoint.Employee.Put_Document).expand({
    type,
  });
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in posting document:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
