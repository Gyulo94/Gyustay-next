import { DetailFilterType, FilterProps } from "@/type/index.type";
import { RoomFormType } from "@/type/room.type";
import { differenceInDays } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

const ROOM_FORM_INITIAL: RoomFormType = {
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
};

interface RoomFormStore {
  roomForm: RoomFormType;
  setRoomForm: (form: RoomFormType) => void;
  resetRoomForm: () => void; // 추가
}

export const useRoomFormStore = create<RoomFormStore>()(
  persist(
    (set) => ({
      roomForm: { ...ROOM_FORM_INITIAL },
      setRoomForm: (form) => set({ roomForm: form }),
      resetRoomForm: () => set({ roomForm: { ...ROOM_FORM_INITIAL } }),
    }),
    {
      name: "room-form-storage",
    }
  )
);

interface SearchStore {
  q?: string;
  setQ: (q: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  q: "",
  setQ: (q) => set({ q }),
}));
