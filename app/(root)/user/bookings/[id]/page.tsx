import { findBookingById } from "@/actions/booking.actions";
import { auth } from "@/auth";
import RefundButton from "@/components/booking/refund-button";
import { Button } from "@/components/ui/button";
import { BLUR_DATA_URL } from "@/constants/common";
import { currencyPrice } from "@/lib/utils";
import { BookingType } from "@/type/booking.type";
import { PaymentType } from "@/type/payment.type";
import { differenceInDays, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const id = (await params).id;
  const booking: BookingType = await findBookingById(id);
  const canRefund = differenceInDays(booking.checkIn, new Date()) > 10;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-20 min-h-[calc(100vh-84.4px-52.8px)] flex flex-col justify-center">
      <h1 className="text-xl md:text-2xl font-semibold">예약 상세 내역</h1>
      <div className="rounded-md border border-gray-300 p-6 mt-10">
        <section className="flex border-b gap-4 pb-6">
          <Image
            src={booking.room?.images[0].url || ""}
            width={100}
            height={100}
            alt={booking.room?.title || ""}
            className="rounded-md"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-sm">{booking.room?.title || ""}</h1>
            <p className="text-xs text-gray-500 line-clamp-4">
              {booking.room?.description}
            </p>
            <p className="text-xs text-gray-500">
              {booking.room?.category.name} |{" "}
              {currencyPrice(booking.room?.price || 0)}
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
      <h1 className="text-xl md:text-2xl font-semibold mt-16">
        결제 상세 내역
      </h1>
      {booking.payments && booking.payments.length > 0 ? (
        booking.payments.map((payment: PaymentType) => (
          <div
            className="rounded-md border border-gray-300 p-6 mt-10"
            key={payment.id}
          >
            <div className="flex flex-col gap-6 pb-4 pt-2">
              <h2 className="font-semibold text-lg md:text-xl">주문 내역</h2>
              <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
                <h3 className="font-semibold">주문</h3>
                <p className="text-gray-800 text-sm mt-1">
                  {payment?.orderName}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 border-b pb-4 pt-2">
              <h2 className="font-semibold text-lg md:text-xl">결제 내역</h2>
              <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
                <h3 className="font-semibold">결제 수단</h3>
                <p className="text-gray-800 text-sm mt-1">{payment?.method}</p>
              </div>
              <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
                <h3 className="font-semibold">결제 상태</h3>
                <p className="text-gray-800 text-sm mt-1">{payment?.status}</p>
                <h3 className="font-semibold mt-2">상점 아이디(MID)</h3>
                <p className="text-gray-800 text-sm mt-1">{payment?.mId}</p>
                <h3 className="font-semibold mt-2">결제 방식</h3>
                <p className="text-gray-800 text-sm mt-1">{payment?.method}</p>
                <h3 className="font-semibold mt-2">카드 정보</h3>
                <p className="text-gray-800 text-sm mt-1">
                  {payment?.cardNumber}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8 pt-4">
              <h2 className="font-semibold text-lg md:text-xl">결제 금액</h2>
              <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
                <h3 className="font-semibold">총 금액</h3>
                <p className="text-gray-800 text-sm mt-1">
                  {currencyPrice(Number(payment?.amount))}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 border-b pb-8 pt-4">
              <h2 className="font-semibold text-lg md:text-xl">결제 일시</h2>
              <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
                <p className="text-gray-800 text-sm mt-1">
                  {payment?.approvedAt &&
                    format(new Date(payment.approvedAt), "yyyy-MM-dd HH:mm")}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-md border border-gray-300 p-6 mt-10 text-gray-600">
          결제 내역이 없습니다.
          <Link
            href={`http://localhost:3000/payments?customerKey=${
              session?.user.id
            }&roomTitle=${encodeURIComponent(
              booking?.room?.title || ""
            )}&checkIn=${booking.checkIn}&checkOut=${
              booking.checkOut
            }&guestCount=${booking.guestCount}&totalAmount=${
              booking.totalAmount
            }&totalDays=${booking.totalDays}&bookingId=${booking.id}`}
          >
            <Button className="w-full mt-4">결제하기</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
