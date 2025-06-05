import { Form, FormField } from "@/components/ui/form";
import { ROOM_FEATURE } from "@/constants/common";
import { useRoomFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { RoomRegisterFeatureType } from "@/type/room.type";
import { RoomRegisterFeatureSchema } from "@/validation/room.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

export default function RoomRegisterFeature({
  defaultValues,
}: {
  defaultValues: RoomRegisterFeatureType;
}) {
  const { roomForm, setRoomForm, setStep } = useRoomFormStore();
  const form = useForm<RoomRegisterFeatureType>({
    resolver: zodResolver(RoomRegisterFeatureSchema),
    defaultValues,
  });

  useEffect(() => {
    if (roomForm) {
      form.setValue("freeCancel", roomForm.freeCancel || false);
      form.setValue("selfCheckIn", roomForm.selfCheckIn || false);
      form.setValue("officeSpace", roomForm.officeSpace || false);
      form.setValue("hasMountainsView", roomForm.hasMountainsView || false);
      form.setValue("hasShampoo", roomForm.hasShampoo || false);
      form.setValue("hasFreeLaundry", roomForm.hasFreeLaundry || false);
      form.setValue("hasAirConditioner", roomForm.hasAirConditioner || false);
      form.setValue("hasWifi", roomForm.hasWifi || false);
      form.setValue("hasBarbeque", roomForm.hasBarbeque || false);
      form.setValue("hasFreeParking", roomForm.hasFreeParking || false);
    }
  }, [roomForm, form.setValue]);
  return (
    <>
      <Stepper count={4} />
      <Form {...form}>
        <form className="mt-8 flex flex-col gap-6 px-4">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소의 편의시설 정보를 추가해주세요.
          </h1>
          <section className="grid grid-cols-2 md:grid-cols-3 gap-4 px-10">
            {ROOM_FEATURE.map((feature) => (
              <FormField
                key={feature.value}
                control={form.control}
                name={feature.value as keyof RoomRegisterFeatureType}
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
            prevOnClick={() => setStep(3)}
            nextOnClick={async () => {
              const submit = await form.trigger();
              if (submit) {
                setRoomForm({
                  ...roomForm,
                  ...form.getValues(),
                });
                setStep(5);
              }
            }}
            nextDisabled={
              !form.formState.isValid || form.formState.isSubmitting
            }
          />
        </form>
      </Form>
    </>
  );
}
