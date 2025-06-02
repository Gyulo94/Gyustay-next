import { userInfoFormSchema } from "@/validation/user.schema";
import { z } from "zod";

export type UserType = {
  id: string;
  email: string;
  image: string;
  description: string;
  name: string;
  provider: string;
  role: "USER" | "ADMIN";
};

export type UserInfoFormType = z.infer<typeof userInfoFormSchema>;
