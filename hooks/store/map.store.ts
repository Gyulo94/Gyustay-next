import { DEFAULT_LAT, DEFAULT_LNG, ZOOM_LEVEL } from "@/constants/common";
import { RoomType } from "@/type/room.type";
import { create } from "zustand";

interface LocationStore {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
  setLat: (lat: string | null) => void;
  setLng: (lng: string | null) => void;
  setZoom: (zoom: number) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
  zoom: ZOOM_LEVEL,
  setLat: (lat) => set({ lat }),
  setLng: (lng) => set({ lng }),
  setZoom: (zoom) => set({ zoom }),
}));

interface SelectedRoomStore {
  selectedRoom: RoomType | null;
  setSelectedRoom: (room: RoomType | null) => void;
}

export const useSelectedRoomStore = create<SelectedRoomStore>((set) => ({
  selectedRoom: null,
  setSelectedRoom: (room) => set({ selectedRoom: room }),
}));
