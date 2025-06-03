import { z } from "zod";

export const CommentFormSchema = z.object({
  content: z.string().min(1, { message: "후기를 입력하세요." }).trim(),
});
