import axios from "axios";
import { Endpoint } from "./API/EndPoint";

// Put Employee Salary address By Id
export const PostEmail = async (data: FormData) => {
  const url = Endpoint.Email.Post;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in post email:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
