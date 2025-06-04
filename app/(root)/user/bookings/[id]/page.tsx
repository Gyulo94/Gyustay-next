import { findBookingById } from "@/actions/booking.actions";
import RefundButton from "@/components/booking/refund-button";
import { BLUR_DATA_URL } from "@/constants/common";
import { currencyPrice } from "@/lib/utils";
import { BookingType } from "@/type/booking.type";
import { differenceInDays, format } from "date-fns";
import Image from "next/image";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const booking: BookingType = await findBookingById(id);
  const canRefund = differenceInDays(booking.checkIn, new Date()) > 10;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-20 h-[calc(100vh-84.4px-52.8px)] flex flex-col justify-center">
      <h1 className="text-xl md:text-3xl font-semibold">예약 상세 내역</h1>
      <div className="rounded-md border border-gray-300 p-6 mt-10">
        <section className="flex border-b gap-4 pb-6">
          <Image
            src={booking.room?.images[0].url!}
            width={100}
            height={100}
            alt={booking.room?.title!}
            className="rounded-md"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-sm">{booking.room?.title!}</h1>
            <p className="text-xs text-gray-500 line-clamp-4">
              {booking.room?.description}
            </p>
            <p className="text-xs text-gray-500">
              {booking.room?.category.name} |{" "}
              {currencyPrice(booking.room?.price!)}
            </p>
            <p className="text-xs text-gray-500">
              후기 {booking.room?.comments.length}
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-b pb-6">
          <h1 className="text-lg md:text-xl mt-4">여행 일정정보</h1>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">날짜</h3>
            <div className="text-gray-900">
              {format(booking.checkIn, "yyyy-MM-dd")} ~{" "}
              {format(booking.checkOut, "yyyy-MM-dd")}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">게스트</h3>
            <div className="text-gray-900">게스트 {booking.guestCount}명</div>
          </div>
        </section>
        <section className="flex flex-col gap-4 pb-6">
          <h1 className="text-lg md:text-xl mt-4">요금 세부정보</h1>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">숙박 일정</h3>
            <div className="text-gray-900">{booking.totalDays}박</div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">총 금액</h3>
            <div className="text-gray-900">
              {currencyPrice(Number(booking.totalAmount))}
            </div>
          </div>
        </section>
        <RefundButton booking={booking} canRefund={canRefund} />
      </div>
    </div>
  );
}
