"use client";

import ButtonWrap from "@/components/rooms/form/button-wrap";
import Stepper from "@/components/rooms/form/stepper";
import { categories } from "@/constants/categories";
import { FormUrl } from "@/constants/common";
import { useRoomFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoomRegisterCategory() {
  const router = useRouter();
  const { roomForm, setRoomForm } = useRoomFormStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [disableSubmit] = useState<boolean>(false);

  const handleSubmit = () => {
    setRoomForm({
      ...roomForm,
      categoryId: selectedCategory,
    });
    router.push(FormUrl.INFO);
  };

  useEffect(() => {
    setSelectedCategory(roomForm?.categoryId || "");
  }, [roomForm]);

  useEffect(() => {
    router.prefetch(FormUrl.INFO);
  }, [router]);

  return (
    <>
      <Stepper count={1} />
      <section className="mb-20 md:mb-0 mt-10 flex flex-col gap-4">
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          다음 중 숙소를 가장 잘 나타내는 것은 무엇인가요?
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-10">
          {categories.map((category) => (
            <button
              type="button"
              key={category.label}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                {
                  "border-2 border-primary": selectedCategory === category.id,
                  "border-2 border-purple-300":
                    selectedCategory !== category.id,
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
        nextDisabled={!selectedCategory || disableSubmit}
        nextOnClick={handleSubmit}
      />
    </>
  );
}
