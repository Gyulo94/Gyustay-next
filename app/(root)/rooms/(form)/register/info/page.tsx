"use client";

import ButtonWrap from "@/components/rooms/form/button-wrap";
import Stepper from "@/components/rooms/form/stepper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormUrl } from "@/constants/common";
import { useRoomFormStore } from "@/hooks/store";
import { RoomInfoFormType } from "@/type/room.type";
import { RoomInfoFormSchema } from "@/validation/room.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function RoomRegisterInfo() {
  const router = useRouter();
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const { roomForm, setRoomForm } = useRoomFormStore();

  const form = useForm<RoomInfoFormType>({
    resolver: zodResolver(RoomInfoFormSchema),
    defaultValues: {
      title: roomForm.title || "",
      description: roomForm.description || "",
      price: roomForm.price || 0,
      bedroomDescription: roomForm.bedroomDescription || "",
    },
  });

  const onSubmit = (data: RoomInfoFormType) => {
    setRoomForm({
      ...roomForm,
      title: data.title || "",
      description: data.description || "",
      bedroomDescription: data.bedroomDescription,
      price: data.price || 0,
    });
    router.push(FormUrl.ADDRESS);
  };

  useEffect(() => {
    if (roomForm) {
      form.setValue("bedroomDescription", roomForm?.bedroomDescription);
      form.setValue("title", roomForm?.title);
      form.setValue("price", roomForm?.price);
      form.setValue("description", roomForm?.description);
    }
  }, [roomForm, form.setValue]);

  useEffect(() => {
    router.prefetch(FormUrl.ADDRESS);
  }, [router]);

  return (
    <>
      <Stepper count={2} />
      <Form {...form}>
        <form
          className="mt-8 flex flex-col gap-6 px-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소의 기본 정보를 입력해주세요
          </h1>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    숙소 이름
                  </FormLabel>
                  <FormControl>
                    <Input className="border-2 border-purple-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    숙소 설명
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-2 border-purple-300 resize-none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    숙소 가격
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      className="border-2 border-purple-300"
                      value={
                        field.value === undefined || field.value === null
                          ? ""
                          : Number(field.value).toLocaleString()
                      }
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(raw === "" ? "" : Number(raw));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="bedroomDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    객실 설명
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-2 border-purple-300 resize-none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonWrap
            prevOnClick={() => router.push(FormUrl.CATEGORY)}
            nextType="submit"
            nextDisabled={disableSubmit}
          />
        </form>
      </Form>
    </>
  );
}
