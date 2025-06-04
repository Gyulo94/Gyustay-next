"use client";

import { useCancelBooking } from "@/hooks/query/user-booking";
import { useConfirm } from "@/hooks/use-confirm";
import { BookingType } from "@/type/booking.type";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  booking: BookingType;
  canRefund: boolean;
}

export default function RefundButton({ booking, canRefund }: Props) {
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 예약을 취소 하시겠습니까?",
    "예약을 취소하면 재예약이 어려울 수 있습니다. 환불금은 예약 취소 후 2~3일 내에 결제한 카드로 입금됩니다. 동의하시는 경우에만 아래 버튼을 눌러 예약을 취소하세요."
  );
  const [refund, setRefund] = useState<boolean>(false);
  const cancelBooking = useCancelBooking(booking.id);

  const handleCancel = async () => {
    const ok = await confirm();
    if (ok) {
      cancelBooking.mutate("CANCELLED");
      setRefund(true);
    }
  };
  return (
    <>
      <ConfirmDialog />
      <section className="flex flex-col gap-4">
        {booking.status === "CANCELLED" || refund ? (
          <Button disabled>예약 취소 완료</Button>
        ) : (
          <Button disabled={canRefund} onClick={handleCancel}>
            예약 취소
          </Button>
        )}
      </section>
    </>
  );
}
