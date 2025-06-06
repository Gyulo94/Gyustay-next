"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRoomRegisterDialogStore } from "@/hooks/store/modal.store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { BsBookmark, BsHouseAdd, BsHouseCheck } from "react-icons/bs";

export default function MyPage() {
  const { data: session } = useSession();
  const { onOpen } = useRoomRegisterDialogStore();

  return (
    <div className="max-w-5xl md:h-[calc(100vh-52.8px-84.4px)] mx-auto px-4 flex items-center">
      <div className="my-auto w-full">
        <h1 className="text-3xl font-semibold">계정</h1>
        <div className="flex gap-2 mt-2 text-lg">
          <Avatar>
            <AvatarImage
              src={session?.user.image || "/images/noProfileImage.jpg"}
            />
          </Avatar>
          <div className="font-semibold">{session?.user.name}</div>
          <div className="font-semibold">·</div>
          <div className="text-gray-700">{session?.user.email}</div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-12 mb-20">
          <Link
            href={"/user/info"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <AiOutlineUser className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">유저 정보</h1>
              <h2 className="text-sm text-gray-500">
                유저 정보 및 프로필 이미지
              </h2>
            </div>
          </Link>
          <div
            onClick={onOpen}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl cursor-pointer"
          >
            <BsHouseAdd className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">숙소 등록</h1>
              <h2 className="text-sm text-gray-500">나의 숙소 등록하기</h2>
            </div>
          </div>
          <Link
            href={"/user/rooms"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <BsHouseCheck className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">숙소 관리</h1>
              <h2 className="text-sm text-gray-500">나의 숙소 관리하기</h2>
            </div>
          </Link>
          <Link
            href={"/user/like"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <AiOutlineHeart className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">찜한 숙소</h1>
              <h2 className="text-sm text-gray-500">찜한 숙소 모아보기</h2>
            </div>
          </Link>
          <Link
            href={"/user/comments"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <AiOutlineComment className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">나의 댓글</h1>
              <h2 className="text-sm text-gray-500">나의 댓글 모아보기</h2>
            </div>
          </Link>
          <Link
            href={"/user/bookings"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <BsBookmark className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">나의 예약</h1>
              <h2 className="text-sm text-gray-500">나의 예약 모아보기</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
