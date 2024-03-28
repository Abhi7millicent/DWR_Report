import { useMutation } from "react-query";
import { PostUploadAttendance } from "../../services/Attendance";

export const usePostUploadAttendance = () => {
  return useMutation(PostUploadAttendance);
};
