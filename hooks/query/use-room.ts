import {
  createRoom,
  findRoomById,
  findRoomsAll,
  findRoomsByUserId,
  findRoomsInMap,
} from "@/actions/room.actions";
import { RoomFormType } from "@/type/room.type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useFindRoomsAll = ({ category }: { category?: string }) => {
  const query = useInfiniteQuery({
    queryKey: ["rooms", { category }],
    queryFn: ({ pageParam = 1 }) => findRoomsAll({ pageParam, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
};

export const useFindRoomsInMap = () => {
  const query = useQuery({
    queryKey: ["rooms", "map"],
    queryFn: findRoomsInMap,
  });
  return query;
};

export const useFindRoomById = (id: string) => {
  const query = useQuery({
    queryKey: ["room", { id }],
    queryFn: () => findRoomById(id),
  });
  return query;
};

export function useCreateRoom() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (values: RoomFormType) => createRoom(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      router.push(`/rooms/${data.body.id}`);
    },
  });
  return mutation;
}

export function useFindRoomsByUserId(limit: number) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const query = useInfiniteQuery({
    queryKey: ["rooms", { userId }],
    queryFn: ({ pageParam = 1 }) => findRoomsByUserId({ limit, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
}
