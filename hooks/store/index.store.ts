import { DetailFilterType, FilterProps } from "@/type/index.type";
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
