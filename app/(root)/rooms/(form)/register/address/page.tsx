"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import ButtonWrap from "@/components/rooms/form/button-wrap";
import Stepper from "@/components/rooms/form/stepper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormUrl } from "@/constants/common";
import { useRoomFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { RoomAddressFormType } from "@/type/room.type";
import { RoomAddressFormSchema } from "@/validation/room.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DaumPostcodeEmbed from "react-daum-postcode";

interface RoomAddressProps {
  address?: string;
}

export default function RoomRegisterAddress() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { roomForm, setRoomForm } = useRoomFormStore();
  const form = useForm<RoomAddressFormType>({
    resolver: zodResolver(RoomAddressFormSchema),
    defaultValues: {
      address: roomForm.address || "",
    },
  });

  const onSubmit = (data: RoomAddressProps) => {
    setRoomForm({
      ...roomForm,
      address: data?.address || "",
    });
    router.push(FormUrl.FEATURE);
  };

  useEffect(() => {
    if (roomForm) {
      form.setValue("address", roomForm.address);
    }
  }, [roomForm, form.setValue]);

  useEffect(() => {
    router.prefetch(FormUrl.FEATURE);
  }, [router]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleComplete(data: any) {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    form.setValue("address", fullAddress);
    setRoomForm({
      ...roomForm,
      address: fullAddress,
    });
    setIsOpen(false);
  }

  return (
    <>
      <Stepper count={3} />
      <Form {...form}>
        <form
          className="mt-10 flex flex-col gap-6 px-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소의 위치를 입력해주세요
          </h1>
          <div className="max-w-xl w-full mx-auto flex flex-col gap-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    숙소 주소
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        className="border-2 border-purple-300"
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={() => setIsOpen((p) => !p)}
                      >
                        주소 검색
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isOpen && (
            <div
              className={cn(
                "max-w-xl mx-auto w-full rounded-lg overflow-hidden",
                {
                  border: isOpen,
                }
              )}
            >
              <DaumPostcodeEmbed
                style={{ width: "100%", height: "450px" }}
                onComplete={handleComplete}
              />
            </div>
          )}
          <ButtonWrap
            prevOnClick={() => router.push(FormUrl.INFO)}
            nextType="submit"
          />
        </form>
      </Form>
    </>
  );
}
