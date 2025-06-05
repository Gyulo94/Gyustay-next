"use client";

import { categories } from "@/constants/categories";
import { useRoomFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

export default function RoomRegisterCategory() {
  const { roomForm, setRoomForm, setStep } = useRoomFormStore();
  const initialCategory =
    categories.find((category) => category.id === roomForm.categoryId)?.label ||
    "";

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);

  return (
    <>
      <Stepper count={1} className="mt-10" />
      <section className="mb-20 md:mb-0 mt-10 flex flex-col gap-4">
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          다음 중 숙소를 가장 잘 나타내는 것은 무엇인가요?
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-10">
          {categories.map((category) => (
            <button
              type="button"
              key={category.label}
              onClick={() => {
                setSelectedCategory(category.label);
                setRoomForm({ ...roomForm, categoryId: category.id });
              }}
              className={cn(
                "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                {
                  "border-2 border-primary":
                    selectedCategory === category.label,
                  "border-2 border-purple-300":
                    selectedCategory !== category.label,
                }
              )}
            >
              <div className="text-2xl flex justify-center">
                <category.icon />
              </div>
              <h1 className="font-semibold text-xs md:text-lg">
                {category.label}
              </h1>
            </button>
          ))}
        </div>
      </section>
      <ButtonWrap
        prevDisabled
        nextDisabled={!selectedCategory}
        nextOnClick={() => setStep(2)}
      />
    </>
  );
}
