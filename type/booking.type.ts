import { RoomType } from "./room.type";
export type BookingType = {
  id?: string;
  checkIn: string;
  checkOut: string;
  guestCount: string;
  totalAmount: string;
  totalDays: string;
  roomId: string;
  room?: RoomType;
  status?: BookingStatusType;
};

export type BookingStatusType = "PENDING" | "CANCELLED" | "SUCCESS";
