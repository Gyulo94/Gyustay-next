import {
  BookingFormSchema,
  RoomAddressFormSchema,
  RoomFeatureFormSchema,
  RoomFormSchema,
  RoomInfoFormSchema,
} from "@/validation/room.schema";
import { z } from "zod";
import { CategoryType } from "./category.type";
import { CommentType } from "./comment.type";
import { ImageType } from "./image.type";
import { LikeType } from "./like.type";
import { UserType } from "./user.type";

export type RoomType = {
  address: string;
  bedroomDescription: string;
  category: CategoryType;
  categoryId: string;
  description: string;
  freeCancel: boolean;
  hasAirConditioner: boolean;
  hasBarbeque: boolean;
  hasFreeLaundry: boolean;
  hasFreeParking: boolean;
  hasMountainsView: boolean;
  hasShampoo: boolean;
  hasWifi: boolean;
  id: string;
  images: ImageType[];
  lat: string;
  lng: string;
  officeSpace: boolean;
  price: number;
  selfCheckIn: boolean;
  title: string;
  user: UserType;
  likes: LikeType[];
  comments: CommentType[];
  createdAt?: string;
  updatedAt?: string;
};

export type BookingFormType = z.infer<typeof BookingFormSchema>;
export type RoomFormType = z.infer<typeof RoomFormSchema>;
export type RoomInfoFormType = z.infer<typeof RoomInfoFormSchema>;
export type RoomAddressFormType = z.infer<typeof RoomAddressFormSchema>;
export type RoomFeatureFormType = z.infer<typeof RoomFeatureFormSchema>;
