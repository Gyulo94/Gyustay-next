import { DetailFilterType, FilterProps } from "@/type/index.type";
import { differenceInDays } from "date-fns";
import { create } from "zustand";

interface DetailFilterStore {
  detailFilter: null | DetailFilterType;
  setDetailFilter: (filter: null | DetailFilterType) => void;
}

export const useDetailFilterStore = create<DetailFilterStore>((set) => ({
  detailFilter: null,
  setDetailFilter: (filter) => set({ detailFilter: filter }),
}));

export interface FilterStore {
  filterValue: FilterProps;
  setFilterValue: (filterValue: FilterProps) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filterValue: {
    location: "",
    checkIn: "",
    checkOut: "",
    guest: 0,
  },
  setFilterValue: (filterValue) => set({ filterValue }),
}));

export function useCalculatedFilterState() {
  const { filterValue } = useFilterStore();
  const checkInDate = filterValue.checkIn
    ? new Date(filterValue.checkIn)
    : new Date();
  const checkOutDate = filterValue.checkOut
    ? new Date(filterValue.checkOut)
    : new Date();
  const guestCount = filterValue.guest || 1;
  const dayCount = differenceInDays(checkOutDate, checkInDate);
  return { guestCount, dayCount };
}
