"use client";
import { useFindRoomsAll } from "@/hooks/query/use-room";
import { useFilterStore } from "@/hooks/store";
import { RoomType } from "@/type/room.type";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { KakaoMapButton } from "../map/map";
import { Loader, RoomsSkeleton } from "../shared/loader";
import RoomItem from "./room-item";

interface Props {
  category?: string;
}

export default function RoomsList({ category }: Props) {
  const { filterValue } = useFilterStore();
  const { ref, inView } = useInView();
  const router = useRouter();
  const location = filterValue.location || "";
  const {
    data: rooms,
    isFetching,
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFindRoomsAll({ category, location });

  if (isError) throw new Error("숙소 목록을 불러오는 중 오류가 발생했습니다.");

  useEffect(() => {
    // let timerId: NodeJS.Timeout | undefined;

    if (inView && hasNextPage) {
      // timerId = setTimeout(() => {
      fetchNextPage();
      // }, 500);
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return isFetching || isLoading ? (
    <RoomsSkeleton />
  ) : (
    <div>
      <div className="grid px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20 sm:px-4 md:px-8 lg:px-16 mt-5">
        {rooms?.pages?.map((page, index) => (
          <Fragment key={index}>
            {page.data.map((room: RoomType) => (
              <RoomItem key={room.id} room={room} />
            ))}
          </Fragment>
        ))}
      </div>
      <KakaoMapButton onClick={() => router.push("/map")} />
      {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
