import { z } from "zod";

export const userInfoFormSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력하세요." }).trim(),
  image: z.string().optional(),
  description: z.string().optional(),
});
