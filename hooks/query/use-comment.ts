import {
  createComment,
  findCommentsAllByUserId,
  findCommentsByRoomId,
} from "@/actions/comment.actions";
import { CommentFormType } from "@/type/comment.type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useCreateComment(roomId: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: CommentFormType) => createComment(values, roomId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["comment"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return mutation;
}

export function useFindCommentsByRoomId(roomId: string, limit: number) {
  const query = useQuery({
    enabled: !!roomId,
    queryKey: ["comments", { roomId }],
    queryFn: () => findCommentsByRoomId(roomId, limit),
  });
  return query;
}

export function useFindCommentsAllByRoomId(roomId: string, limit: number) {
  const query = useInfiniteQuery({
    enabled: !!roomId,
    queryKey: ["comments", "all", { roomId }],
    queryFn: ({ pageParam = 1 }) =>
      findCommentsByRoomId(roomId, limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
}

export function useFindCommentsAllByUserId(limit: number) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const query = useInfiniteQuery({
    queryKey: ["comments", "all", { userId }],
    queryFn: ({ pageParam = 1 }) => findCommentsAllByUserId(limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
}
