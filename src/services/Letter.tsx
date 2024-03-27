import axios from "axios";
import { Endpoint } from "./API/EndPoint";
import { parseTemplate } from "url-template";

export const PostGenerateOfferLetter = async (type: string, data: any) => {
  const url = parseTemplate(Endpoint.Letter.Post_GenerateOfferLetter).expand({
    type,
  });

  try {
    const response = await axios.post(url, data, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in post Generate Offer Letter:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const PostUploadLetter = async (data: any) => {
  const url = Endpoint.Letter.Post_updateLetter;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in uploading letter:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
