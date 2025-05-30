import { findRoomsAll, findRoomsInMap } from "@/actions/room.actions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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
