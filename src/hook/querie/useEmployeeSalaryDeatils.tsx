import { useMutation, useQuery } from "react-query";
import {
  GetEmployeeSalaryDeatilsById,
  PutEmployeeSalaryDeatilsById,
} from "../../services/EmployeeSalaryDeatils";
interface SalaryDetailsData {
  bankAccountName: string;
  ifscCode: string;
  accountNo: string;
  uan: string;
  epfoNo: string;
  panNo: string;
  annualSalary: number; // Assuming annualSalary and monthlySalary are numbers
  monthlySalary: number;
}
export const useGetEmployeeSalaryDeatilsById = (id: String) => {
  return useQuery(["qGetEmployeeSalaryDeatilsById", id], () =>
    GetEmployeeSalaryDeatilsById(String(id))
  );
};

export const usePutEmployeeSalaryDeatilsById = () => {
  return useMutation(
    async ({
      id,
      salaryData,
    }: {
      id: string;
      salaryData: SalaryDetailsData;
    }) => {
      const updateSalary = await PutEmployeeSalaryDeatilsById(id, salaryData);
      return updateSalary;
    },
    {}
  );
};
