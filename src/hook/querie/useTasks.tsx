import { useMutation, useQuery } from "react-query";
import {
  DeleteTaskById,
  GetTaskById,
  GetTaskList,
  PostTask,
  PutTaskById,
} from "../../services/Task";

interface IDeleteTask {
  deleteFlag: boolean;
}
interface IEditTask {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const usePostTask = () => {
  return useMutation(PostTask);
};

export const useGetTaskList = () => {
  return useQuery(["qGetTaskList"], () => GetTaskList());
};
export const useDeleteTaskById = () => {
  return useMutation(
    async ({ id, data }: { id: string; data: IDeleteTask }) => {
      const deleteData = await DeleteTaskById(id, data);
      return deleteData;
    }
  );
};
export const usePutTaskById = () => {
  return useMutation(async ({ id, data }: { id: string; data: IEditTask }) => {
    PutTaskById(id, data);
  });
};

export const useGetTaskById = (id: string) => {
  return useQuery(["qGetTaskById", id], () => GetTaskById(id));
};
