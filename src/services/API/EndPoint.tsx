// const API_URL = process.env.VITE_API_DWR_BASE_URL;
const API_URL = import.meta.env.VITE_API_DWR_BASE_URL;

export const Endpoint = {
  Login: `${API_URL}/authenticate/login`,
  Employee: `${API_URL}/employee/list`,
};
