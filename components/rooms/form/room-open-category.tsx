"use client";

import { categories } from "@/constants/categories";
import { useRoomFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

export default function RoomOpenCategory({
  categoryId,
}: {
  categoryId?: string;
}) {
  const { roomForm, setRoomForm, setStep } = useRoomFormStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    roomForm.categoryId || ""
  );

  useEffect(() => {
    if (categoryId) {
      const category = categories.find((cat) => cat.id === categoryId);
      if (category) {
        setSelectedCategory(category.id);
        setRoomForm({ ...roomForm, categoryId: selectedCategory });
      }
    }
  }, [roomForm, categoryId, selectedCategory, setRoomForm]);

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
                setSelectedCategory(category.id);
                setRoomForm({ ...roomForm, categoryId: category.id });
              }}
              className={cn(
                "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                {
                  "border-2 border-primary":
                    roomForm.categoryId === category.id,
                  "border-2 border-purple-300":
                    roomForm.categoryId !== category.id,
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
        nextOnClick={() => {
          setStep(2);
          if (selectedCategory)
            setRoomForm({ ...roomForm, categoryId: selectedCategory });
        }}
      />
    </>
  );
}
