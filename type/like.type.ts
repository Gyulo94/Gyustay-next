import { RoomType } from "./room.type";

export type LikeType = {
  id: string;
  userId: string;
  roomId: number;
  createdAt: string;
  room: RoomType;
};
