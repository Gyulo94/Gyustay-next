import { useFilterStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { RoomType } from "@/type/room.type";
import { addDays, format } from "date-fns";
import { buttonVariants } from "../ui/button";
import { Calendar } from "../ui/calendar";

export default function CalendarSection({ room }: { room: RoomType }) {
  const {
    filterValue,
    setFilterValue,
    checkInMonth,
    checkOutMonth,
    setCheckInMonth,
    setCheckOutMonth,
  } = useFilterStore();
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="text-gray-500 text-sm">
        {filterValue.checkIn && filterValue.checkOut
          ? `${filterValue.checkIn} ~ ${filterValue.checkOut}`
          : "체크인/체크아웃 날짜를 선택해주세요."}
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Calendar
          mode="single"
          selected={new Date(filterValue.checkIn)}
          // month={
          //   filterValue.checkIn ? new Date(filterValue.checkIn) : new Date()
          // }
          month={checkInMonth}
          onMonthChange={setCheckInMonth}
          onSelect={(date: Date | undefined) => {
            if (!date) return;
            setFilterValue({
              ...filterValue,
              checkIn: format(date, "yyyy-MM-dd"),
            });
            setCheckInMonth(date);
          }}
          className="h-full w-full flex"
          classNames={{
            months:
              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-4 w-full flex flex-col",
            table: "w-full h-full border-collapse space-y-1",
            head_cell:
              "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] w-full",
            cell: cn(
              "[&:has([aria-selected])]:bg-accent relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md",
              "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              "w-full"
            ),
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "size-8 w-full p-0 font-normal aria-selected:opacity-100 cursor-pointer"
            ),
          }}
          fromDate={new Date()}
        />
        <Calendar
          mode="single"
          selected={new Date(filterValue.checkOut)}
          // month={
          //   filterValue.checkOut ? new Date(filterValue.checkOut) : new Date()
          // }
          month={checkOutMonth}
          onMonthChange={setCheckOutMonth}
          onSelect={(date: Date | undefined) => {
            if (!date) return;
            setFilterValue({
              ...filterValue,
              checkOut: format(date, "yyyy-MM-dd"),
            });
            setCheckOutMonth(date);
          }}
          className="h-full w-full flex"
          classNames={{
            months:
              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
            month: "space-y-4 w-full flex flex-col",
            table: "w-full h-full border-collapse space-y-1",
            head_cell:
              "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] w-full",
            cell: cn(
              "[&:has([aria-selected])]:bg-accent relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md",
              "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              "w-full"
            ),
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "size-8 w-full p-0 font-normal aria-selected:opacity-100 cursor-pointer"
            ),
          }}
          fromDate={
            filterValue.checkIn
              ? addDays(new Date(filterValue.checkIn), 1)
              : new Date()
          }
        />
      </div>
    </div>
  );
}
