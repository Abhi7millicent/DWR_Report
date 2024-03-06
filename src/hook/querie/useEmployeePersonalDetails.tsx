import { useMutation, useQuery } from "react-query";
import {
  GetEmployeePersonalDeatilsById,
  PutEmployeePersonalDeatilsById,
} from "../../services/EmployeePersonalDetails";

interface PersonalDetailsData {
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContact1: string;
  relation1: string;
  emergencyContact2: string;
  relation2: string;
}

export const useGetEmployeePersonalDeatilsById = (id: String) => {
  return useQuery(["qGetEmployeePersonalDeatilsById", id], () =>
    GetEmployeePersonalDeatilsById(String(id))
  );
};

export const usePutEmployeePersonalDeatilsById = () => {
  return useMutation(
    async ({
      id,
      personalData,
    }: {
      id: string;
      personalData: PersonalDetailsData;
    }) => {
      const updateSalary = await PutEmployeePersonalDeatilsById(
        id,
        personalData
      );
      return updateSalary;
    },
    {}
  );
};
