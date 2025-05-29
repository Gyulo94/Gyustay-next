export type UserType = {
  id: string;
  email: string;
  image: string;
  description: string;
  name: string;
  provider: string;
  role: "USER" | "ADMIN";
};
