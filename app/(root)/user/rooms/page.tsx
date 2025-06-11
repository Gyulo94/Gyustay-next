"use client";

import RoomSearchFilter from "@/components/rooms/form/room-search-filter";
import { Loader } from "@/components/shared/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteRoom, useFindRoomsByUserId } from "@/hooks/query/use-room";
import { useSearchStore } from "@/hooks/store";
import { useConfirm } from "@/hooks/use-confirm";
import { currencyPrice } from "@/lib/utils";
import { RoomType } from "@/type/room.type";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useInView } from "react-intersection-observer";

export default function MyRoomsPage() {
  const router = useRouter();
  const { q } = useSearchStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );
  const deleteRoom = useDeleteRoom();
  const { ref, inView } = useInView();
  const {
    data: rooms,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useFindRoomsByUserId({ limit: 12, q });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isError) {
    throw new Error("내 숙소 목록을 불러오는 중 오류가 발생했습니다.");
  }

  const handleDelete = async (roomId: string) => {
    const ok = await confirm();
    if (ok) {
      deleteRoom.mutate(roomId);
    }
  };
  return (
    <>
      <ConfirmDialog />
      <div className="mt-10 mb-40 max-w-7xl mx-auto min-h-[calc(100vh-252.8px-84.4px)] overflow-auto px-4">
        <h1 className="mb-10 text-lg md:text-2xl font-semibold">
          나의 숙소 관리
        </h1>
        <RoomSearchFilter />
        <table className="text-sm text-left text-gray-500 shadow-lg overflow-x-auto table-auto">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-[120px]">
                숙소
              </th>
              <th scope="col" className="px-6 py-3 min-w-[300px]">
                주소
              </th>
              <th scope="col" className="px-6 py-3 min-w-[120px]">
                카테고리
              </th>
              <th scope="col" className="px-6 py-3 min-w-[120px]">
                가격
              </th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">
                등록일
              </th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">
                수정일
              </th>
              <th scope="col" className="px-6 py-3 min-w-[100px]">
                상세보기
              </th>
              <th scope="col" className="px-6 py-3 min-w-[80px]"></th>
            </tr>
          </thead>
          <tbody>
            {rooms?.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((room: RoomType) => (
                  <tr className="bg-white border-b" key={room.id}>
                    <td className="px-6 py-4">{room.title}</td>
                    <td className="px-6 py-4">{room.address}</td>
                    <td className="px-6 py-4">{room.category.name}</td>
                    <td className="px-6 py-4">{currencyPrice(room.price)}</td>
                    <td className="px-6 py-4">
                      {format(new Date(room.createdAt!), "yyyy-MM-dd HH:mm")}
                    </td>
                    <td className="px-6 py-4">
                      {room.updatedAt &&
                        format(new Date(room.updatedAt), "yyyy-MM-dd HH:mm")}
                    </td>
                    <td className="px-6 py-4 min-w-[80px]">
                      <Link
                        href={`/rooms/${room.id}`}
                        className="font-medium text-gray-600 hover:underline"
                      >
                        보기
                      </Link>
                    </td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <td className="px-6 py-4 min-w-[80px]">
                          <button className="hover:bg-neutral-100 transition cursor-pointer p-3 rounded-full">
                            <BsThreeDotsVertical />
                          </button>
                        </td>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => router.push(`/rooms/edit/${room.id}`)}
                        >
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(room.id)}>
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
        {(isFetching || hasNextPage || isFetchingNextPage) && (
          <Loader className="my-20" />
        )}
        <div className="w-full touch-none h-10 mb-10" ref={ref} />
      </div>
    </>
  );
}
