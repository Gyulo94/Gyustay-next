"use client";

import RoomItem from "@/components/home/room-item";
import { Loader, RoomsSkeleton } from "@/components/shared/loader";
import { useFindLikesAllByUserId } from "@/hooks/query/use-like";
import { LikeType } from "@/type/like.type";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function LikePage() {
  const { ref, inView } = useInView();
  const {
    data: rooms,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useFindLikesAllByUserId(12);
  if (isError) throw new Error("후기 목록을 불러오는 중 오류가 발생했습니다.");

  useEffect(() => {
    // let timerId: NodeJS.Timeout | undefined;

    if (inView && hasNextPage) {
      // timerId = setTimeout(() => {
      fetchNextPage();
      // }, 100);
    }
  }, [fetchNextPage, hasNextPage, inView]);
  console.log("rooms", rooms);

  return (
    <main className="max-w-[2520px] md:min-h-[calc(100vh-92.8px-84.4px)] mt-10 mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <h1 className="font-semibold text-lg md:text-2xl mt-10 px-4">
        찜한 숙소 리스트
      </h1>
      <div className="mt-2 text-gray-500 px-4">찜한 숙소 리스트입니다.</div>
      <div>
        {isFetching || isLoading ? (
          <RoomsSkeleton />
        ) : (
          <div>
            <div className="grid px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20 md:px-8 lg:px-16 mt-5">
              {rooms?.pages?.map((page, index) => (
                <Fragment key={index}>
                  {page?.data?.map((like: LikeType) => (
                    <RoomItem key={like.id} room={like.room} />
                  ))}
                </Fragment>
              ))}
            </div>
            {(isFetching || isFetchingNextPage || hasNextPage) && <Loader />}
            <div className="w-full touch-none h-10 mb-10" ref={ref} />
          </div>
        )}
      </div>
    </main>
  );
}
