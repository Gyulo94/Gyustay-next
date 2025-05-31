import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyPrice(price: number) {
  const formattedPrice = price.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
  return formattedPrice;
}
