import { DetailFilterType, FilterProps } from "@/type/index.type";
import { RoomFormType } from "@/type/room.type";
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
  checkInMonth: Date;
  setCheckInMonth: (date: Date) => void;
  checkOutMonth: Date;
  setCheckOutMonth: (date: Date) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filterValue: {
    location: "",
    checkIn: "",
    checkOut: "",
    guest: 1,
  },
  setFilterValue: (filterValue) => set({ filterValue }),
  checkInMonth: new Date(),
  setCheckInMonth: (date) => set({ checkInMonth: date }),
  checkOutMonth: new Date(),
  setCheckOutMonth: (date) => set({ checkOutMonth: date }),
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

interface RoomFormStore {
  step: number;
  setStep: (step: number) => void;
  roomForm: RoomFormType;
  setRoomForm: (form: RoomFormType) => void;
}

export const useRoomFormStore = create<RoomFormStore>((set) => ({
  step: 1,
  roomForm: {
    images: [],
    title: "",
    address: "",
    description: "",
    bedroomDescription: "",
    price: 0,
    categoryId: "",
    lat: "",
    lng: "",
    freeCancel: false,
    selfCheckIn: false,
    officeSpace: false,
    hasMountainsView: false,
    hasShampoo: false,
    hasFreeLaundry: false,
    hasAirConditioner: false,
    hasWifi: false,
    hasBarbeque: false,
    hasFreeParking: false,
  },
  setStep: (step) => set({ step }),
  setRoomForm: (form) => set({ roomForm: form }),
}));
