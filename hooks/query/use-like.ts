import { findLikesAllByUserId, toggleLike } from "@/actions/like.actions";
import { findRoomById } from "@/actions/room.actions";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useFindLikeRoomById(roomId?: string, userId?: string) {
  const query = useQuery({
    queryKey: ["like", { roomId }],
    queryFn: () => findRoomById(roomId, userId),
    enabled: !!roomId,
    refetchOnWindowFocus: false,
  });
  return query;
}

export function useFindLikesAllByUserId(limit: number) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const query = useInfiniteQuery({
    enabled: !!userId,
    queryKey: ["likes", "all", { userId }],
    queryFn: ({ pageParam = 1 }) => findLikesAllByUserId(limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
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
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return mutation;
}
