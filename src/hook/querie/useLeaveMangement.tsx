import { useMutation, useQuery } from "react-query";
import {
  GetLeaveMangement,
  PostLeaveMangement,
} from "../../services/LeaveMangement";

export const usePostLeaveMangement = () => {
  return useMutation(PostLeaveMangement);
};
export const useGetLeaveMangement = (id: string) => {
  return useQuery(["qGetLeaveMangement", id], () => GetLeaveMangement(id), {
    enabled: !!id,
  });
};
