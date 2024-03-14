import { useMutation } from "react-query";
import { PostGenerateOfferLetter } from "../../services/Letter";

export const usePostGenerateOfferLetter = () => {
  return useMutation(async ({ type, data }: { type: string; data: any }) => {
    const postLetter = await PostGenerateOfferLetter(type, data);
    return postLetter;
  });
};
