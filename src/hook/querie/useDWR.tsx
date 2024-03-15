import { useMutation, useQuery } from "react-query";
import { GetDWRList, PostDWR } from "../../services/DWR";

export const usePostDWR = () => {
  return useMutation(PostDWR);
};
export const useGetDWRList = (employeeId: string, date: string) => {
  return useQuery(["qGetDWRList", employeeId, date], () =>
    GetDWRList(employeeId, date)
  );
};
