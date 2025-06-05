import { PaymentType } from "./payment.type";
import { RoomType } from "./room.type";
import { UserType } from "./user.type";
export type BookingType = {
  id?: string;
  checkIn: string;
  checkOut: string;
  guestCount: string;
  totalAmount: string;
  totalDays: string;
  roomId: string;
  room?: RoomType;
  user?: UserType;
  status?: BookingStatusType;
  createdAt?: string;
  updatedAt?: string;
  payments: PaymentType[];
};

export type BookingStatusType = "SUCCESS" | "PENDING" | "CANCELLED" | "FAILED";
