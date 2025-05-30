import { findRoomsAll } from "@/actions/room.actions";
import { useInfiniteQuery } from "@tanstack/react-query";

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
