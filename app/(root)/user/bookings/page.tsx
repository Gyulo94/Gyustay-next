"use client";

import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL } from "@/constants/common";
import { useFindBookingsAll } from "@/hooks/query/user-booking";
import { currencyPrice } from "@/lib/utils";
import { BookingType } from "@/type/booking.type";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { BiChevronRight } from "react-icons/bi";

export default function BookingsListPage() {
  const router = useRouter();
  const {
    data: bookings,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useFindBookingsAll();
  return (
    <div className="max-w-7xl mx-auto px-4 min-h-[calc(100vh-84.4px-92.8px)]">
      <h1 className="font-semibold mt-10 text-lg md:text-2xl">
        나의 예약 리스트
      </h1>
      <p className="mt-2 text-gray-500">나의 예약 일정을 확인해보세요.</p>
      {isLoading ? (
        <Loader className="mt-10 mb-20" />
      ) : (
        <div className="mb-20 mt-10 flex flex-col">
          {bookings?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.data.map((booking: BookingType) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-6 border-b pb-8 hover:bg-black/5 cursor-pointer p-6"
                >
                  <h1 className="font-semibold text-lg md:text-xl">
                    {booking.status === "SUCCESS"
                      ? "예약된 여행"
                      : "취소된 여행"}
                  </h1>
                  <div className="flex gap-4 items-center w-full justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={booking.room.images[0].url}
                        width={80}
                        height={80}
                        alt={booking.room.title}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                      <div>
                        <h2 className="font-semibold">{booking.room.title}</h2>
                        <p className="mt-1 text-sm text-gray-600">
                          {booking.room.address}
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                          {format(booking.checkIn, "yyyy년 MM월 dd일")} ~{" "}
                          {format(booking.checkOut, "yyyy년 MM월 dd일")} |{" "}
                          {booking.guestCount}명 |{" "}
                          {currencyPrice(Number(booking.totalAmount))}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => router.push(`/rooms/${booking.room.id}`)}
                      className="flex gap-1 items-center underline hover:text-gray-500"
                    >
                      숙소 보기 <BiChevronRight className="text-xl" />
                    </button>
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={() =>
                        window.open(`/user/bookings/${booking.id}`, "_blank")
                      }
                    >
                      예약내역 확인
                    </Button>
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
          {hasNextPage && (
            <div className="flex flex-col items-center">
              <Button
                type="button"
                onClick={() => fetchNextPage()}
                className="mt-8 py-6 shadow-sm hover:shadow-xl rounded-full"
              >
                예약 더 불러오기
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
