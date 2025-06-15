import { z } from "zod";

export const userInfoFormSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
});
