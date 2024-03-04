import { useQuery } from "react-query";
import { GetEmployeeList } from "../../services/Employee";

export const useGetEmployeeList = () => {
  return useQuery(["qGetEmployeeList"], () => GetEmployeeList());
};
