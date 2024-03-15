import { useMutation, useQuery } from "react-query";
import {
  GetAllRequestLeave,
  GetBalancedLeave,
  GetLeaveMangement,
  PostApproveLeave,
  PostLeaveMangement,
  PostRejectLeave,
} from "../../services/LeaveMangement";

export const usePostLeaveMangement = () => {
  return useMutation(PostLeaveMangement);
};
export const useGetLeaveMangement = (id: string) => {
  return useQuery(["qGetLeaveMangement", id], () => GetLeaveMangement(id), {
    enabled: !!id,
  });
};
export const useGetAllRequestLeave = () => {
  return useQuery(["qAllRequestLeaveLeave"], () => GetAllRequestLeave());
};

export const usePostApproveLeave = () => {
  return useMutation(PostApproveLeave);
};
export const usePostRejectLeave = () => {
  return useMutation(PostRejectLeave);
};

export const useGetBalancedLeave = (id: string) => {
  return useQuery(["qGetBalancedLeave", id], () => GetBalancedLeave(id), {
    enabled: !!id,
  });
};
