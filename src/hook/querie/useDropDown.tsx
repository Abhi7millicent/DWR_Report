import { useMutation, useQuery } from "react-query";
import {
  GetRoleEmployeeList,
  PostRoleEmployeeList,
} from "../../services/DropDown";

export const useGetRoleEmployeeList = () => {
  return useQuery(["qGetRoleEmployeeList"], () => GetRoleEmployeeList());
};
export const usePostRoleEmployeeList = () => {
  return useMutation(PostRoleEmployeeList);
};
