import { CommentFormSchema } from "@/validation/comment.shema";
import { z } from "zod";
import { RoomType } from "./room.type";
import { UserType } from "./user.type";

export type CommentFormType = z.infer<typeof CommentFormSchema>;

export type CommentType = z.infer<typeof CommentFormSchema> & {
  id: string;
  name: string;
  createdAt: string;
  userId: string;
  roomId: number;
  room: RoomType;
  user: UserType;
};
