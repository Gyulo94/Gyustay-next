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
