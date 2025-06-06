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
import { useRoomUpdateDialogStore } from "../store/modal.store";

export const useFindRoomsAll = ({ category }: { category?: string }) => {
  const query = useInfiniteQuery({
    queryKey: ["rooms", { category }],
    queryFn: ({ pageParam = 1 }) => findRoomsAll({ pageParam, category }),
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
    enabled: !!userId,
    queryKey: ["rooms", { userId }],
    queryFn: ({ pageParam = 1 }) => findRoomsByUserId({ limit, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data.length > 0 ? lastPage.page + 1 : undefined,
    refetchOnWindowFocus: false,
  });
  return query;
}

export function useUpdateRoom(id?: string) {
  const { onClose } = useRoomUpdateDialogStore();
  const { setStep, setRoomForm } = useRoomFormStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (values: RoomFormType) => updateRoom(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      onClose();
      setStep(1);
      setRoomForm({
        address: "",
        bedroomDescription: "",
        categoryId: "",
        description: "",
        freeCancel: false,
        hasAirConditioner: false,
        hasBarbeque: false,
        hasFreeLaundry: false,
        hasFreeParking: false,
        hasMountainsView: false,
        hasShampoo: false,
        hasWifi: false,
        images: [],
        lat: "",
        lng: "",
        officeSpace: false,
        price: 0,
        selfCheckIn: false,
        title: "",
      });
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
