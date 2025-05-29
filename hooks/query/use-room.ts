import { findRoomsAll } from "@/actions/room.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindRoomsAll = () => {
  const query = useQuery({
    queryKey: ["rooms"],
    queryFn: findRoomsAll,
  });
  return query;
};
