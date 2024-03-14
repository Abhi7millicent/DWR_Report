import { useMutation } from "react-query";
import { PostEmail } from "../../services/Email";

export const usePostEmail = () => {
  return useMutation(PostEmail);
};
