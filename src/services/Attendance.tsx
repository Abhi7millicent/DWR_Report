import axios from "axios";
import { Endpoint } from "./API/EndPoint";

// Post Upload Attendance
export const PostUploadAttendance = async (data: FormData) => {
  const url = Endpoint.Attendance.Post;

  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error in Post Upload Attendance:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
