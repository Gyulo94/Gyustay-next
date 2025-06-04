"use client";

import { useCreateBoking } from "@/hooks/query/user-booking";
import { BookingType } from "@/type/booking.type";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function BookingButton() {
  const { status } = useSession();
  const createBooking = useCreateBoking();
  const searchParams = useSearchParams();
  const params = useParams();

  const id = params.id;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guestCount = searchParams.get("guestCount");
  const totalAmount = searchParams.get("totalAmount");
  const totalDays = searchParams.get("totalDays");

  function handleSubmit() {
    const values: BookingType = {
      roomId: id as string,
      checkIn: checkIn as string,
      checkOut: checkOut as string,
      guestCount: guestCount as string,
      totalAmount: totalAmount as string,
      totalDays: totalDays as string,
    };
    createBooking.mutate(values);
  }
  return (
    <div>
      <Button
        onClick={handleSubmit}
        disabled={status === "unauthenticated"}
        type="button"
        className="w-full"
      >
        확인 및 결제
      </Button>
    </div>
  );
}
