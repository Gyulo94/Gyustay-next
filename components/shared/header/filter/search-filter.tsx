import { Calendar } from "@/components/ui/calendar";
import { useDetailFilterStore, useFilterStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import FilterContainer from "./filter-container";

export function SearchFilter() {
  return (
    <>
      <LocationFilter />
      <CheckInFilter />
      <CheckOutFilter />
      <GuestFilter />
    </>
  );
}

const LocationFilter = () => {
  const { filterValue, setFilterValue } = useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  return (
    <FilterContainer
      title="지역으로 검색하기"
      isShow={detailFilter === "location"}
    >
      <div className="flex flex-wrap gap-4 mt-4">
        {["서울", "경기", "부산", "대구", "인천", "광주", "대전", "울산"].map(
          (value) => (
            <button
              key={value}
              type="button"
              className={cn(
                "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-primary focus:text-white",
                {
                  "bg-primary text-white": filterValue.location === value,
                }
              )}
              onClick={() => {
                setFilterValue({ ...filterValue, location: value });
                setDetailFilter("checkIn");
              }}
            >
              {value}
            </button>
          )
        )}
        <button
          className={cn(
            "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-primary focus:text-white",
            {
              "bg-primary text-white": filterValue.location === "",
            }
          )}
          onClick={() => {
            setFilterValue({
              ...filterValue,
              location: "",
            });
          }}
        >
          전체
        </button>
      </div>
    </FilterContainer>
  );
};

const CheckInFilter = () => {
  const { filterValue, setFilterValue, setCheckInMonth, checkInMonth } =
    useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setFilterValue({
      ...filterValue,
      checkIn: format(date, "yyyy-MM-dd"),
    });
    setCheckInMonth(date);
    setDetailFilter("checkOut");
  };
  return (
    <FilterContainer
      title="체크인 날짜 선택하기"
      isShow={detailFilter === "checkIn"}
      isDatePicker={true}
    >
      <Calendar
        mode="single"
        month={checkInMonth}
        onMonthChange={setCheckInMonth}
        selected={new Date(filterValue.checkIn)}
        onSelect={handleDateSelect}
        className="rounded-md"
        fromDate={new Date()}
      />
    </FilterContainer>
  );
};

const CheckOutFilter = () => {
  const { filterValue, setFilterValue, checkOutMonth, setCheckOutMonth } =
    useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setFilterValue({
      ...filterValue,
      checkOut: format(date, "yyyy-MM-dd"),
    });
    setCheckOutMonth(date);
    setDetailFilter("guest");
  };
  return (
    <FilterContainer
      title="체크아웃 날짜 선택하기"
      isShow={detailFilter === "checkOut"}
      isDatePicker={true}
    >
      <Calendar
        mode="single"
        month={checkOutMonth}
        onMonthChange={setCheckOutMonth}
        selected={new Date(filterValue.checkOut)}
        onSelect={handleDateSelect}
        className="rounded-md"
        fromDate={
          filterValue.checkIn
            ? addDays(new Date(filterValue.checkIn), 1)
            : new Date()
        }
      />
    </FilterContainer>
  );
};

const GuestFilter = () => {
  const { filterValue, setFilterValue } = useFilterStore();
  const { detailFilter } = useDetailFilterStore();
  const [counter, setCounter] = useState<number>(filterValue.guest || 1);
  return (
    <FilterContainer
      title="여행자 수 추가하기"
      isShow={detailFilter === "guest"}
    >
      <div className="mt-4 border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center">
        <div>
          <div className="font-semibold text-sm">게스트 수 추가</div>
          <div className="text-gray-500 text-xs">숙박 인원을 입력해주세요</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            disabled={counter <= 0}
            className="rounded-ful size-8 disabled:border-gray-200 hover:border-black cursor-pointer"
            type="button"
            onClick={() => {
              setCounter((val) => val - 1);
              setFilterValue({
                ...filterValue,
                guest: counter - 1,
              });
            }}
          >
            <AiOutlineMinusCircle
              className={cn("m-auto", { "text-gray-200": counter <= 0 })}
            />
          </button>
          <button className="w-3 text-center">
            {filterValue.guest || counter}
          </button>
          <button
            disabled={counter >= 20}
            className="rounded-full size-8 disabled:border-gray-200 hover:border-black cursor-pointer"
            type="button"
            onClick={() => {
              setCounter((val) => val + 1);
              setFilterValue({
                ...filterValue,
                guest: counter + 1,
              });
            }}
          >
            <AiOutlinePlusCircle
              className={cn("m-auto", { "text-gray-200": counter >= 20 })}
            />
          </button>
        </div>
      </div>
    </FilterContainer>
  );
};
