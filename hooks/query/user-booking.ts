import { createBooking } from "@/actions/booking.actions";
import { BookingType } from "@/type/booking.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateBoking() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: BookingType) => createBooking(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      router.replace(`/user/bookings/${data.body.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return mutation;
}
