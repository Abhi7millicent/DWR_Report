import { postLogin } from "../../services/Login";
import { useMutation } from "react-query";
export const usePostLogin = () => {
  return useMutation(postLogin);
};
