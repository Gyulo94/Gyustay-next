import { createComment, findCommentsByRoomId } from "@/actions/comment.action";
import { CommentFormType } from "@/type/comment.type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateComment(roomId: number) {
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

export function useFindCommentsByRoomId(roomId: number, limit: number) {
  const query = useQuery({
    enabled: !!roomId,
    queryKey: ["comments", { roomId }],
    queryFn: () => findCommentsByRoomId(roomId, limit),
  });
  return query;
}

export function useFindCommentsAllByRoomId(roomId: number, limit: number) {
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
