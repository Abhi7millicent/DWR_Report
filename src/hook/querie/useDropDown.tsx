import { useMutation, useQuery } from "react-query";
import {
  GetRoleEmployeeList,
  GetTaskType,
  PostRoleEmployeeList,
  PostTaskType,
} from "../../services/DropDown";

export const useGetRoleEmployeeList = () => {
  return useQuery(["qGetRoleEmployeeList"], () => GetRoleEmployeeList());
};
export const usePostRoleEmployeeList = () => {
  return useMutation(PostRoleEmployeeList);
};
export const useGetTaskType = () => {
  return useQuery(["qGetTaskType"], () => GetTaskType());
};
export const usePostTaskType = () => {
  return useMutation(PostTaskType);
};
