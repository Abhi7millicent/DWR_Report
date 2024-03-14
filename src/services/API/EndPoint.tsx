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
    Put_EmployeeAdressById: `${API_URL}/employee-address/{addressType}/{id}`,
    Post_Register: `${API_URL}/employee/add`,
    Get_DocumentList: `${API_URL}/employee-document/list/{id}`,
    Post_Document: `${API_URL}/employee-document/add`,
    Put_Document: `${API_URL}/employee-document/{id}`,
    Get_EductionList: `${API_URL}/educational-details/list/{id}`,
    Post_Eduction: `${API_URL}/educational-details/save`,
    Put_Eduction: `${API_URL}/educational-details/delete/{id}`,
    Post_Leave: `${API_URL}/employee/addBalancedLeave`,
  },
  Leave: {
    Post_ById: `${API_URL}/leave-management/add`,
    Get_ById: `${API_URL}/leave-management/list/{id}`,
    Get_AllRequestLeave: `${API_URL}/leave-management/requestedLeave`,
    Post_ApproveLeave: `${API_URL}/leave-management/approve/{id}`,
    Post_RejectLeave: `${API_URL}/leave-management/reject/{id}`,
  },
  Email: {
    Post: `${API_URL}/email/send-mail`,
  },
  Letter: {
    Post_GenerateOfferLetter: `${API_URL}/letter/{type}`,
  },
};
