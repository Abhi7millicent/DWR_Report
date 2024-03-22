import { useMutation, useQuery } from "react-query";
import {
  DeleteProjectById,
  GetProjectById,
  GetProjectList,
  PostProject,
  PutProjectById,
} from "../../services/Projects";

interface IDeleteProject {
  deleteFlag: boolean;
}
interface IEditProject {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const usePostProject = () => {
  return useMutation(PostProject);
};

export const useGetProjectList = () => {
  return useQuery(["qGetProjectList"], () => GetProjectList());
};
export const useDeleteProjectById = () => {
  return useMutation(
    async ({ id, data }: { id: string; data: IDeleteProject }) => {
      const deleteData = await DeleteProjectById(id, data);
      return deleteData;
    }
  );
};
export const usePutProjectById = () => {
  return useMutation(
    async ({ id, data }: { id: string; data: IEditProject }) => {
      PutProjectById(id, data);
    }
  );
};

export const useGetProjectById = (id: string) => {
  return useQuery(["qGetProjectById", id], () => GetProjectById(id));
};
