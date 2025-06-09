import { useFilterStore } from "@/hooks/store";
import { addDays, format } from "date-fns";
import { Calendar } from "../ui/calendar";

export default function CalendarSection() {
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
          className="h-full w-full"
          hidden={{ before: new Date() }}
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
          className="h-full w-full"
          hidden={{
            before: filterValue.checkIn
              ? addDays(new Date(filterValue.checkIn), 1)
              : new Date(),
          }}
        />
      </div>
    </div>
  );
}
