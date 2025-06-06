import { z } from "zod";

export const BookingFormSchema = z.object({
  checkIn: z
    .string()
    .min(1, { message: "체크인 날짜를 선택하세요." })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "유효한 날짜를 입력하세요.",
    }),
  checkOut: z
    .string()
    .min(1, { message: "체크아웃 날짜를 선택하세요." })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "유효한 날짜를 입력하세요.",
    }),
  guest: z
    .number()
    .min(1, { message: "최소 1명의 게스트를 선택하세요." })
    .max(20, { message: "최대 20명의 게스트를 선택할 수 있습니다." }),
});

export const RoomFormSchema = z.object({
  images: z.string().min(1, { message: "이미지를 업로드하세요." }).array(),
  title: z.string().min(1, { message: "숙소 제목을 입력하세요." }).trim(),
  address: z.string().min(1, { message: "숙소 주소를 입력하세요." }).trim(),
  description: z.string().min(1, { message: "숙소 설명을 입력하세요." }).trim(),
  bedroomDescription: z
    .string()
    .min(1, { message: "침실 설명을 입력하세요." })
    .trim(),
  price: z.number().min(1000, { message: "최소 1,000원의 가격을 입력하세요." }),
  categoryId: z
    .string()
    .min(1, { message: "숙소 카테고리를 선택하세요." })
    .trim(),
  lat: z.string().min(1, { message: "위도를 입력하세요" }).trim(),
  lng: z.string().min(1, { message: "경도를 입력하세요" }).trim(),
  freeCancel: z.boolean().optional(),
  selfCheckIn: z.boolean().optional(),
  officeSpace: z.boolean().optional(),
  hasMountainsView: z.boolean().optional(),
  hasShampoo: z.boolean().optional(),
  hasFreeLaundry: z.boolean().optional(),
  hasAirConditioner: z.boolean().optional(),
  hasWifi: z.boolean().optional(),
  hasBarbeque: z.boolean().optional(),
  hasFreeParking: z.boolean().optional(),
});

export const RoomInfoFormSchema = z.object({
  title: z.string().min(1, { message: "숙소 제목을 입력하세요." }).trim(),
  description: z.string().min(1, { message: "숙소 설명을 입력하세요." }).trim(),
  price: z.number().min(1000, { message: "최소 1,000원의 가격을 입력하세요." }),
  bedroomDescription: z
    .string()
    .min(1, { message: "침실 설명을 입력하세요." })
    .trim(),
});

export const RoomAddressFormSchema = z.object({
  address: z.string().min(1, { message: "숙소 위치를 입력하세요." }).trim(),
});

export const RoomFeatureFormSchema = z.object({
  freeCancel: z.boolean().optional(),
  selfCheckIn: z.boolean().optional(),
  officeSpace: z.boolean().optional(),
  hasMountainsView: z.boolean().optional(),
  hasShampoo: z.boolean().optional(),
  hasFreeLaundry: z.boolean().optional(),
  hasAirConditioner: z.boolean().optional(),
  hasWifi: z.boolean().optional(),
  hasBarbeque: z.boolean().optional(),
  hasFreeParking: z.boolean().optional(),
});
