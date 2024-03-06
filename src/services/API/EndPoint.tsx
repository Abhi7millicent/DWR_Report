// const API_URL = process.env.VITE_API_DWR_BASE_URL;
const API_URL = import.meta.env.VITE_API_DWR_BASE_URL;

export const Endpoint = {
  Login: `${API_URL}/authenticate/login`,
  // Employee: `${API_URL}/employee/list`,
  Employee: {
    Get_list: `${API_URL}/employee/list`,
    Get_ById: `${API_URL}/employee/{id}`,
    Put_ById: `${API_URL}/employee/{id}`,
    Put_SalaryDeatilsByEmployeeId: `${API_URL}/employee-salary/update/{id}`,
    Get_SalaryDeatilsByEmployeeId: `${API_URL}/employee-salary/{id}`,
    Get_AdressByEmployeeId: `${API_URL}/employee-address/{addressType}/{id}`,
    Get_PesonalDetailByEmployeeId: `${API_URL}/personal-details/{id}`,
    Put_PesonalDetailByEmployeeId: `${API_URL}/personal-details/update/{id}`,
  },
};
