import {
  createRoom,
  deleteRoom,
  findRoomById,
  findRoomsAll,
  findRoomsByUserId,
  findRoomsInMap,
  updateRoom,
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
import { useRoomFormStore } from "../store";

export const useFindRoomsAll = ({
  category,
  location,
}: {
  category?: string;
  location?: string;
}) => {
  const query = useInfiniteQuery({
    queryKey: ["rooms", { category, location }],
    queryFn: ({ pageParam = 1 }) =>
      findRoomsAll({ pageParam, category, location }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data.length > 0 ? lastPage.page + 1 : undefined,
    refetchOnWindowFocus: false,
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

export const useFindRoomById = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["room", { id }],
    queryFn: () => findRoomById(id),
  });
  return query;
};

export function useCreateRoom() {
  const { resetRoomForm } = useRoomFormStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (values: RoomFormType) => createRoom(values),
    onSuccess: (data) => {
      toast.success(data.message);
      resetRoomForm();
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      router.push(`/rooms/${data.body.id}`);
    },
  });
  return mutation;
}

export function useFindRoomsByUserId({
  limit,
  q,
}: {
  limit: number;
  q?: string;
}) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const query = useInfiniteQuery({
    enabled: !!userId,
    queryKey: ["rooms", { userId, q }],
    queryFn: ({ pageParam = 1 }) => findRoomsByUserId({ limit, q, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data.length > 0 ? lastPage.page + 1 : undefined,
    refetchOnWindowFocus: false,
  });
  return query;
}

export function useUpdateRoom(id?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (values: RoomFormType) => updateRoom(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.invalidateQueries({ queryKey: ["room", { id }] });
      router.push(`/rooms/${data.body.id}`);
    },
  });
  return mutation;
}

export function useDeleteRoom() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id?: string) => deleteRoom(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
      queryClient.invalidateQueries({
        queryKey: ["room"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return mutation;
}
