import { useQuery, useMutation } from "react-query";
import {
  GetEmployeeList,
  GetEmployeeById,
  PutEmployeeById,
} from "../../services/Employee";

interface Employee {
  id: string;
}

interface EmployeeData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
  reporting: string;
}

export const useGetEmployeeList = () => {
  return useQuery(["qGetEmployeeList"], () => GetEmployeeList());
};

export const useGetEmployeeById = (data: string) => {
  return useQuery(["qGetEmployeeById", data], () => GetEmployeeById(data), {
    enabled: !!data,
  });
};

export const usePutEmployeeById = () => {
  return useMutation(
    async ({ id, empdata }: { id: string; empdata: EmployeeData }) => {
      // Call PutEmployeeById and return the mutated data
      const updatedData = await PutEmployeeById(empdata, id);
      return updatedData;
    },
    {
      onSuccess: () => {
        console.log("sucessfull");
      },
      onError: (error: Error) => {
        console.error("Error in useUpdateEmployeeById:", error);
      },
    }
  );
};
