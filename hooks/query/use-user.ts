import { editUser } from "@/actions/user.actions";
import { UserInfoFormType } from "@/type/user.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditUser() {
  const mutation = useMutation({
    mutationFn: (values: UserInfoFormType) => editUser(values),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.message),
  });
  return mutation;
}
