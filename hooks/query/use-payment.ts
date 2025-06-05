import { createPayment } from "@/actions/payment.actions";
import { CreatePaymentType } from "@/type/payment.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreatePayment() {
  const mutation = useMutation({
    mutationFn: (values: CreatePaymentType) => createPayment(values),
    mutationKey: ["payment"],
    onSuccess: (data) => toast.success(data.message),
    onError: (error: Error) => toast.error(error.message),
  });
  return mutation;
}
