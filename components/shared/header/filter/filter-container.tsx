import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
  isShow?: boolean;
  isDatePicker?: boolean;
}
export default function FilterContainer({
  children,
  title,
  isShow,
  isDatePicker,
}: Props) {
  return (
    <div
      className={cn(
        "absolute top-76 sm:top-[75px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full sm:max-w-3xl rounded-xl",
        {
          hidden: !isShow,
          "sm:w-[780px]": !isDatePicker,
          "left-[50%] translate-x-[-50%] sm:w-fit": isDatePicker,
        }
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}
