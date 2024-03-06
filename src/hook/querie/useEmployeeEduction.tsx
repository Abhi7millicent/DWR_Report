import { useMutation, useQuery } from "react-query";
import {
  GetEmployeeEductionList,
  PostEmployeeEduction,
  PutEmployeeEduction,
} from "../../services/EmplyeeEduction";
interface IUpdateEduction {
  deleteFlag: boolean;
}
export const useGetEmployeeEductionList = (id: string) => {
  return useQuery(["qGetEmployeeEductionList", id], () =>
    GetEmployeeEductionList(id)
  );
};
export const usePostEmployeeEduction = () => {
  return useMutation(PostEmployeeEduction);
};

export const usePutEmployeeEduction = () => {
  return useMutation(
    async ({ id, data }: { id: string; data: IUpdateEduction }) => {
      const updateData = await PutEmployeeEduction(id, data);
      return updateData;
    }
  );
};
