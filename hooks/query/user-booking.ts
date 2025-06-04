"use client";

import { createBooking, findBookingsAll } from "@/actions/booking.actions";
import { BookingType } from "@/type/booking.type";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
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

export const useFindBookingsAll = () => {
  const { data: session } = useSession();
  const query = useInfiniteQuery({
    enabled: !!session?.user.id,
    queryKey: ["bookings", { userId: session?.user.id }],
    queryFn: ({ pageParam = 1 }) => findBookingsAll({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
};
