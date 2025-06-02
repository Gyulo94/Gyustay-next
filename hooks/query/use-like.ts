import { toggleLike } from "@/actions/like.actions";
import { findRoomById } from "@/actions/room.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFindLikeRoomById(roomId?: number, userId?: string) {
  const query = useQuery({
    queryKey: ["like", { userId }],
    queryFn: () => findRoomById(roomId, userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
  return query;
}

export function useToggleLike() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["like"],
    mutationFn: toggleLike,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return mutation;
}
