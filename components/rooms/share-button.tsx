"use client";

import { useShareDialogStore } from "@/hooks/store/modal.stroe";
import { RoomType } from "@/type/room.type";
import { CiShare1 } from "react-icons/ci";

export default function ShareButton({ room }: { room: RoomType }) {
  const { onOpen, setImage, setTitle, setAddress, setCategory } =
    useShareDialogStore();
  return (
    <button
      type="button"
      onClick={() => {
        onOpen();
        setImage(room.images[0].url);
        setTitle(room.title);
        setAddress(room.address);
        setCategory(room.category.name);
      }}
      className="flex gap-2 items-center px-2 py-1.5 rounded-lg cursor-pointer hover:bg-black/10"
    >
      <CiShare1 />
      <span className="underline">공유하기</span>
    </button>
  );
}
