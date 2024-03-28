import { useMutation, useQuery } from "react-query";
import {
  DeleteProjectById,
  GetProjectById,
  GetProjectList,
  GetProjectNameList,
  GetProjectTechnologiesList,
  PostProject,
  PostTechnologiesList,
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
export const useGetProjectTechnologiesList = () => {
  return useQuery(["qGetProjectTechnologiesList"], () =>
    GetProjectTechnologiesList()
  );
};
export const usePostTechnologiesList = () => {
  return useMutation(PostTechnologiesList);
};

// Get Project Name List
export const useGetProjectNameList = () => {
  return useQuery(["qGetProjectNameList"], () => GetProjectNameList());
};
