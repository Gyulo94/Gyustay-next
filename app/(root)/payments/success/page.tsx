import { getPayment } from "@/actions/payment.actions";
import { Button } from "@/components/ui/button";
import { currencyPrice } from "@/lib/utils";
import { RequestPaymentType } from "@/type/payment.type";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  searchParams: RequestPaymentType;
}

export default async function SuccessPage({ searchParams }: Props) {
  const paymentKey = await searchParams.paymentKey;
  const orderId = await searchParams.orderId;
  const amount = await searchParams.amount;

  const data = await getPayment({
    paymentKey,
    orderId,
    amount,
  });

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-84.4px-52.8px)] py-20 px-4 flex flex-col justify-center">
      <div className="flex flex-col gap-6 border-b pb-8 pt-4">
        <h2 className="font-semibold text-lg md:text-2xl">주문 내역</h2>
        <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">주문</h3>
          <p className="text-gray-800 text-sm mt-1">
            {data?.payment.orderName}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 border-b pb-8 pt-4">
        <h2 className="font-semibold text-lg md:text-2xl">결제 내역</h2>
        <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">결제 수단</h3>
          <p className="text-gray-800 text-sm mt-1">{data?.payment.method}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 border-b pb-8 pt-4">
        <h2 className="font-semibold text-lg md:text-2xl">결제 금액</h2>
        <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
          <h3 className="font-semibold">총 금액</h3>
          <p className="text-gray-800 text-sm mt-1">
            {currencyPrice(Number(data?.payment.amount ?? amount))}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 border-b pb-8 pt-4">
        <h2 className="font-semibold text-lg md:text-2xl">결제 일시</h2>
        <div className="rounded-md border-primary p-2 border-2 cursor-pointer hover:bg-black/5">
          <p className="text-gray-800 text-sm mt-1">
            {data?.payment.approvedAt &&
              format(new Date(data.payment.approvedAt), "yyyy-MM-dd HH:mm")}
          </p>
        </div>
      </div>
      <Link href={"/user/bookings"}>
        <Button className="w-full">예약 내역 확인</Button>
      </Link>
    </div>
  );
}
