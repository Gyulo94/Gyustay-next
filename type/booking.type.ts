import { RoomType } from "./room.type";
export type BookingType = {
  checkIn: string;
  checkOut: string;
  guestCount: string;
  totalAmount: string;
  totalDays: string;
  roomId: string;
  room: RoomType;
};
