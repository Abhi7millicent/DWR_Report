import { useQuery } from "react-query";
import { GetEmployeeAdressById } from "../../services/EmployeeAdress";

export const useGetEmployeeAdressById = (id: string, addressType: string) => {
  return useQuery(["qGetEmployeeAdressById", id], () =>
    GetEmployeeAdressById(id, addressType)
  );
};
