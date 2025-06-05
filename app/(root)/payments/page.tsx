"use client";

import { Button } from "@/components/ui/button";
import { TOSS_PAYMENTS_CLIENT_KEY } from "@/constants/common";
import { useCreatePayment } from "@/hooks/query/use-payment";
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as uuid from "uuid";

export default function PaymentsPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const price = searchParams.get("totalAmount") || "0";
  const customerKey = searchParams.get("customerKey") || uuid.v4();
  const totalDays = searchParams.get("totalDays") || "0";
  const roomTitle = searchParams.get("roomTitle") || "GyuStay's Room";
  const bookingId = searchParams.get("bookingId")!;
  const createPayment = useCreatePayment();
  const router = useRouter();
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  const clientKey = TOSS_PAYMENTS_CLIENT_KEY!;

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({
        customerKey,
      });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      await widgets.setAmount({ currency: "KRW", value: Number(price) });

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);
    }

    renderPaymentWidgets();
  }, [widgets]);

  async function handlePayment() {
    try {
      const uniqueOrderId = uuid.v4();
      await widgets
        ?.requestPayment({
          orderId: uniqueOrderId,
          orderName: `${roomTitle.slice(0, 10)}_${totalDays}박`,
          customerName: session?.user.name || "고객",
          customerEmail: session?.user.email!,
        })
        .then(function (data) {
          createPayment.mutate(
            {
              bookingId,
              amount: Number(price),
              status: "IN_PROGRESS",
              orderName: `${roomTitle.slice(0, 10)}_${totalDays}박`,
              orderId: uniqueOrderId,
            },
            {
              onSuccess: () =>
                router.replace(
                  `/payments/success?paymentKey=${data.paymentKey}&orderId=${data.orderId}&amount=${data.amount.value}`
                ),
            }
          );
        })
        .catch(function (error) {
          if (error.code === "USER_CANCEL") {
            toast.error("결제가 취소되었습니다.");
          } else if (error.code === "INVALID_CARD_COMPANY") {
            toast.error("유효하지 않은 카드사입니다.");
          } else {
            toast.error(
              error.message || "결제에 실패했습니다. 다시 시도해주세요."
            );
          }
        });
    } catch (error) {}
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 h-[calc(100vh-84.4px-52.8px)] flex flex-col justify-center">
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="text-lg md:text-2xl font-semibold">확인 및 결제</h1>
        <p className="text-gray-600 mb-4">
          결제 수단을 선택하고 결제를 진행해주세요. 환불금은 예약 취소 후 2~3일
          내에 결제한 카드로 입금됩니다. 동의하시는 경우에만 아래 버튼을 눌러
          예약을 결제하세요.
        </p>
        <div id="payment-method" className="w-full" />
        <div id="agreement" className="w-full" />
        <Button
          variant={"default"}
          className="w-full mt-8"
          onClick={handlePayment}
        >
          결제하기
        </Button>
      </div>
    </div>
  );
}
