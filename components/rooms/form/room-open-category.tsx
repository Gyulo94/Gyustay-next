"use client";

import { categories } from "@/constants/categories";
import { useRoomFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

export default function RoomOpenCategory() {
  const { roomForm, setRoomForm, setStep } = useRoomFormStore();
  const handleCategoryClick = (id: string) => {
    setRoomForm({ ...roomForm, categoryId: id });
  };
  const currentCategoryIdInStore = roomForm.categoryId;

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
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                {
                  "border-2 border-primary":
                    currentCategoryIdInStore === category.id,
                  "border-2 border-purple-300":
                    currentCategoryIdInStore !== category.id,
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
        nextDisabled={!currentCategoryIdInStore}
        nextOnClick={() => setStep(2)}
      />
    </>
  );
}
