"use client";

import { useCalculatedFilterState, useFilterStore } from "@/hooks/store";
import { cn, currencyPrice } from "@/lib/utils";
import { BookingFormType, RoomType } from "@/type/room.type";
import { BookingFormSchema } from "@/validation/room.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function BookingForm({ room }: { room: RoomType }) {
  const router = useRouter();
  const { filterValue, setFilterValue } = useFilterStore();
  const { dayCount, guestCount } = useCalculatedFilterState();

  const totalAmount = dayCount > 0 ? room.price * dayCount : 0;
  const checkFromValid = totalAmount > 0 && guestCount > 0;

  const form = useForm<BookingFormType>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      checkIn: filterValue.checkIn,
      checkOut: filterValue.checkOut,
      guest: filterValue.guest || 1,
    },
  });
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  useEffect(() => {
    form.reset({
      checkIn: filterValue.checkIn,
      checkOut: filterValue.checkOut,
      guest: filterValue.guest || 1,
    });
  }, [filterValue, form]);
  return (
    <Form {...form}>
      <form
        className="mt-2"
        onSubmit={form.handleSubmit(() =>
          router.push(
            `/rooms/${room.id}/bookings?checkIn=${form.getValues(
              "checkIn"
            )}&checkOut=${form.getValues(
              "checkOut"
            )}&guestCount=${form.getValues(
              "guest"
            )}&totalAmount=${totalAmount}&totalDays=${dayCount}`
          )
        )}
      >
        <div className="mt-4">
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">체크인</FormLabel>
                <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span>체크인 날짜를 선택하세요.</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      month={field.value ? new Date(field.value) : new Date()}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date);
                        setFilterValue({
                          ...filterValue,
                          checkIn: date ? format(date, "yyyy-MM-dd") : "",
                        });
                        setIsCheckInOpen(false);
                      }}
                      disabled={(date) =>
                        date < new Date() ||
                        date > new Date(form.getValues("checkOut"))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4">
          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  체크아웃
                </FormLabel>
                <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span>체크아웃 날짜를 선택하세요.</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      month={field.value ? new Date(field.value) : new Date()}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date);
                        setFilterValue({
                          ...filterValue,
                          checkOut: date ? format(date, "yyyy-MM-dd") : "",
                        });
                        setIsCheckOutOpen(false);
                      }}
                      disabled={(date) =>
                        date < addDays(new Date(form.getValues("checkIn")), 1)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4">
          <FormField
            control={form.control}
            name="guest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">인원</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(v) => {
                      field.onChange(Number(v));
                      setFilterValue({ ...filterValue, guest: Number(v) });
                    }}
                    defaultValue={String(field.value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="인원 수를 선택하세요" />
                    </SelectTrigger>
                    {
                      <SelectContent>
                        {[...Array(20)].map((_, i) => (
                          <SelectItem key={i} value={String(i + 1)}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    }
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-4">
          <Button type="submit" disabled={!checkFromValid} className="w-full">
            예약하기
          </Button>
          <p className="text-center text-gray-600 mt-4 text-xs md:text-sm">
            예약 확정 전에는 요금이 청구되지 않습니다.
          </p>
        </div>
      </form>
      <div className="mt-4 flex flex-col gap-2 border-b border-b-gray-300 pb-4 text-xs md:text-sm">
        <div className="flex justify-between">
          <div className="text-gray-600 underline underline-offset-4">
            {currencyPrice(room.price)} x {dayCount}박
          </div>
          <div className="text-gray-500">{currencyPrice(totalAmount)}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-600 underline underline-offset-4">
            GyuStay 수수료
          </div>
          <div className="text-gray-500">{currencyPrice(0)}</div>
        </div>
        <div className="flex justify-between mt-6">
          <div>총 합계</div>
          <div>{currencyPrice(totalAmount)}</div>
        </div>
      </div>
    </Form>
  );
}
