import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

interface IUpdateDocument {
  deleteFlag: boolean;
}
export const GetDocumentList = async (id: string) => {
  const url = parseTemplate(Endpoint.Employee.Get_DocumentList).expand({
    id,
  });
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in Document List:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const PostDocument = async (data: any) => {
  const url = Endpoint.Employee.Post_Document;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in posting document:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
export const PutDocument = async (id: string, data: IUpdateDocument) => {
  const url = parseTemplate(Endpoint.Employee.Put_Document).expand({
    id,
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
