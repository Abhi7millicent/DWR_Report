import axios from "axios";
import { Endpoint } from "./API/EndPoint";

interface ILogin {
  email: string;
  password: string;
}

export async function postLogin(credentials: ILogin) {
  const url = Endpoint.Login;

  try {
    const response = await axios.post(url, credentials);
    return response.data; // Return the response data
  } catch (error) {
    // Handle errors
    console.error("Error in postLogin:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
