import { useMutation, useQuery } from "react-query";
import {
  GetDWRListBaseOnDate,
  GetDWRList,
  PostDWR,
  GetDWRListBaseOnRange,
} from "../../services/DWR";

export const usePostDWR = () => {
  return useMutation(PostDWR);
};
export const useGetDWRListBaseOnDate = (employeeId: string, date: string) => {
  return useQuery(["qGetDWRListBaseOnDate", employeeId, date], () =>
    GetDWRListBaseOnDate(employeeId, date)
  );
};
export const useGetDWRList = (employeeId: string) => {
  return useQuery(["qGetDWRList", employeeId], () => GetDWRList(employeeId));
};
export const useGetDWRListBaseOnRange = (
  employeeId: string,
  startDate: string,
  endDate: string
) => {
  return useQuery(
    ["qGetDWRListBaseOnRange", employeeId, startDate, endDate],
    () => GetDWRListBaseOnRange(employeeId, startDate, endDate)
  );
};
