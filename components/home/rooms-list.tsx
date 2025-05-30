"use client";
import { useFindRoomsAll } from "@/hooks/query/use-room";
import { RoomType } from "@/type/room.type";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader, RoomsSkeleton } from "../shared/loader";
import RoomItem from "./room-item";

interface Props {
  category?: string;
}

export default function RoomsList({ category }: Props) {
  const { ref, inView } = useInView();

  const {
    data: rooms,
    isFetching,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFindRoomsAll({ category });

  useEffect(() => {
    // let timerId: NodeJS.Timeout | undefined;

    if (inView && hasNextPage) {
      // timerId = setTimeout(() => {
      fetchNextPage();
      // }, 100);
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
      {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10 bg-primary" ref={ref} />
    </div>
  );
}
