import { useMutation, useQuery } from "react-query";
import {
  GetDocumentList,
  PostDocument,
  PutDocument,
} from "../../services/EmployeeDocument";
interface IUpdateDocument {
  deleteFlag: boolean;
}
export const useGetDocumentList = (id: string) => {
  return useQuery(["qGetDocumentList", id], () => GetDocumentList(id));
};
export const usePostDocument = () => {
  return useMutation(PostDocument);
};
export const usePutDocument = () => {
  return useMutation(
    async ({ id, data }: { id: string; data: IUpdateDocument }) => {
      const updateData = await PutDocument(id, data);
      return updateData;
    }
  );
};
