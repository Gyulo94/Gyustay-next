"use client";

import ButtonWrap from "@/components/rooms/form/button-wrap";
import Stepper from "@/components/rooms/form/stepper";
import { Form, FormField } from "@/components/ui/form";
import { FormUrl, ROOM_FEATURE } from "@/constants/common";
import { useRoomFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { RoomFeatureFormType } from "@/type/room.type";
import { RoomFeatureFormSchema } from "@/validation/room.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function RoomRegisterFeature() {
  const { roomForm, setRoomForm } = useRoomFormStore();
  const router = useRouter();
  const form = useForm<RoomFeatureFormType>({
    resolver: zodResolver(RoomFeatureFormSchema),
    defaultValues: {
      freeCancel: roomForm.freeCancel || false,
      selfCheckIn: roomForm.selfCheckIn || false,
      officeSpace: roomForm.officeSpace || false,
      hasMountainsView: roomForm.hasMountainsView || false,
      hasShampoo: roomForm.hasShampoo || false,
      hasFreeLaundry: roomForm.hasFreeLaundry || false,
      hasAirConditioner: roomForm.hasAirConditioner || false,
      hasWifi: roomForm.hasWifi || false,
      hasBarbeque: roomForm.hasBarbeque || false,
      hasFreeParking: roomForm.hasFreeParking || false,
    },
  });

  useEffect(() => {
    router.prefetch(FormUrl.IMAGE);
  }, [router]);

  const onSubmit = (data: RoomFeatureFormType) => {
    setRoomForm({
      ...roomForm,
      freeCancel: data.freeCancel || false,
      selfCheckIn: data.selfCheckIn || false,
      officeSpace: data.officeSpace || false,
      hasMountainsView: data.hasMountainsView || false,
      hasShampoo: data.hasShampoo || false,
      hasFreeLaundry: data.hasFreeLaundry || false,
      hasAirConditioner: data.hasAirConditioner || false,
      hasWifi: data.hasWifi || false,
      hasBarbeque: data.hasBarbeque || false,
      hasFreeParking: data.hasFreeParking || false,
    });
    router.push(FormUrl.IMAGE);
  };

  return (
    <>
      <Stepper count={4} />
      <Form {...form}>
        <form
          className="mt-8 flex flex-col gap-6 px-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소의 편의시설 정보를 추가해주세요.
          </h1>
          <section className="grid grid-cols-2 md:grid-cols-3 gap-4 px-10">
            {ROOM_FEATURE.map((feature) => (
              <FormField
                key={feature.value}
                control={form.control}
                name={feature.value as keyof RoomFeatureFormType}
                render={({ field }) => (
                  <label
                    className={cn(
                      "rounded-md hover:bg-purple-50 px-6 py-4 flex flex-col gap-2 cursor-pointer text-xs md:text-lg text-center",
                      {
                        "border-2 border-primary": !!field.value,
                        "border-2 border-purple-300": !field.value,
                      }
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="hidden"
                    />
                    <div className="flex justify-center">
                      <feature.icon className="text-lg md:text-2xl" />
                    </div>
                    {feature.label}
                  </label>
                )}
              />
            ))}
          </section>
          <ButtonWrap
            prevOnClick={() => router.push(FormUrl.ADDRESS)}
            nextType="submit"
            nextDisabled={
              !form.formState.isValid || form.formState.isSubmitting
            }
          />
        </form>
      </Form>
    </>
  );
}
