import { useQuery } from "react-query";
import { GetEmployeeList, GetEmployeeById } from "../../services/Employee";

interface Employee {
  id: string;
}

export const useGetEmployeeList = () => {
  return useQuery(["qGetEmployeeList"], () => GetEmployeeList());
};

export const useGetEmployeeById = (data: Employee) => {
  return useQuery(["qGetEmployeeById", data.id], () => GetEmployeeById(data), {
    enabled: !!data.id,
  });
};
