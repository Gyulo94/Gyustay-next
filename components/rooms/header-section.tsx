"use client";

import { BLUR_DATA_URL } from "@/constants/common";
import { useImageListDialogStore } from "@/hooks/store/modal.store";
import { RoomType } from "@/type/room.type";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Loader } from "../shared/loader";

export function HeaderSection({ room }: { room: RoomType }) {
  const { onOpen, setImages } = useImageListDialogStore();
  const ShareButton = dynamic(() => import("./share-button"), {
    ssr: false,
    loading: () => <Loader />,
  });

  const LikeButton = dynamic(() => import("./like-button"), {
    ssr: false,
    loading: () => <Loader />,
  });
  return (
    <>
      <h1 className="text-lg md:text-3xl font-medium px-4">{room.title}</h1>
      <div className="flex w-full justify-between items-center px-4">
        <div className="underline text-xs md:text-sm mt-2">{room.address}</div>
        <div className="flex gap-2 text-xs md:text-sm mt-2">
          <ShareButton room={room} />
          <LikeButton room={room} />
        </div>
      </div>
      <div className="mt-6 relative">
        <div className="grid md:grid-cols-2 md:gap-4 gap-2 align-middle h-[400px] overflow-hidden md:rounded-lg">
          {room.images.slice(0, 2).map((img) => (
            <div key={img.url} className="w-full relative">
              <Image
                src={img.url}
                alt="room Image"
                style={{
                  objectFit: "cover",
                }}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                fill
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setImages(room.images);
            onOpen();
          }}
          className="absolute right-6 bottom-8 bg-white px-4 py-1.5 text-black rounded-md text-sm flex gap-2 items-center cursor-pointer hover:shadow-lg"
        >
          <AiOutlineUnorderedList />
          사진 모두 보기
        </button>
      </div>
    </>
  );
}
