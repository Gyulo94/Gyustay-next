"use client";

import { FeatureDescription } from "@/constants/common";
import { cn } from "@/lib/utils";
import { RoomType } from "@/type/room.type";
import {
  AiOutlineCheckCircle,
  AiOutlineDesktop,
  AiOutlineWifi,
} from "react-icons/ai";
import { BsDoorClosed, BsFan } from "react-icons/bs";
import { GiBarbecue } from "react-icons/gi";
import { LuCircleParking } from "react-icons/lu";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { PiBathtub, PiMountainsDuotone } from "react-icons/pi";
import { Avatar, AvatarImage } from "../ui/avatar";
import BookingSection from "./booking-section";

export default function FeatureSection({ room }: { room: RoomType }) {
  return (
    <div className="md:grid md:grid-cols-3 gap-8 mt-8 relative">
      <div className="col-span-2">
        <div className="flex items-center justify-between px-4">
          <div>
            <h1 className="text-lg md:text-xl">
              {room.user.name ?? "호스트"}님이 호스팅하는 숙소
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {room.user.description ?? "호스트 설명이 없습니다."}
            </p>
          </div>
          <Avatar className="size-12 shadow">
            <AvatarImage
              src={room.user.image ?? "/images/noProfileImage.jpg"}
            />
          </Avatar>
        </div>
        <div className="mt-4 flex flex-col gap-6 py-6 border-y border-gray-300">
          <div className="flex gap-6 items-center px-4">
            <AiOutlineCheckCircle className="text-lg md:text-2xl" />
            <div>
              <div className="font-semibold">무료 취소</div>
              <div className="text-sm text-gray-400">
                {room.freeCancel
                  ? FeatureDescription.FREE_CANCEL
                  : FeatureDescription.PAID_CANCEL}
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-center px-4">
            <BsDoorClosed className="text-lg md:text-2xl" />
            <div>
              <div className="font-semibold">셀프 체크인</div>
              <div className="text-sm text-gray-400">
                {room.selfCheckIn
                  ? FeatureDescription.SELF_CHECKIN
                  : FeatureDescription.SELF_CHECKIN_DISALLOWED}
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-center px-4">
            <AiOutlineDesktop className="text-lg md:text-2xl" />
            <div>
              <div className="font-semibold">사무 시설</div>
              <div className="text-sm text-gray-400">
                {room.officeSpace
                  ? FeatureDescription.FREE_OFFICE_SPACE
                  : FeatureDescription.NO_OFFICE_SPACE}
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 px-4 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">숙소 설명</h1>
          {room.description ?? "숙소 설명이 없습니다."}
        </div>
        <div className="py-6 px-4 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">숙박 장소</h1>
          {room.description ?? "숙소 설명이 없습니다."}
        </div>
        <div className="py-6 px-4 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">숙소 편의시설</h1>
          <div className="grid md:grid-cols-2 gap-1">
            <div className="flex gap-2 items-center mt-4">
              <AiOutlineCheckCircle className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.freeCancel,
                })}
              >
                무료 취소
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <BsDoorClosed className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.selfCheckIn,
                })}
              >
                셀프 체크인
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <AiOutlineDesktop className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.officeSpace,
                })}
              >
                사무 시설
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <PiMountainsDuotone className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.hasMountainsView,
                })}
              >
                마운틴 뷰
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <PiBathtub className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.hasShampoo,
                })}
              >
                샴푸 및 욕실 용품
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <MdOutlineLocalLaundryService className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.hasFreeLaundry,
                })}
              >
                무료 세탁
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <BsFan className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.hasAirConditioner,
                })}
              >
                에어컨
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <AiOutlineWifi className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.hasWifi,
                })}
              >
                무료 와이파이
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <GiBarbecue className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.hasBarbeque,
                })}
              >
                바베큐 시설
              </span>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <LuCircleParking className="text-lg md:text-2xl" />
              <span
                className={cn("text-gray-600", {
                  "line-through": !room.hasFreeParking,
                })}
              >
                무료 주차
              </span>
            </div>
          </div>
        </div>
        <div className="py-6 px-4 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">캘린더</h1>
          <div className="mt-4 rounded-lg p-5 border border-gray-300">
            캘린더 위치
          </div>
        </div>
        <div className="py-6 px-4 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">후기</h1>
          <div className="mt-4 rounded-lg p-5 border border-gray-300">
            후기가 들어갑니다
          </div>
        </div>
        <div className="py-6 px-4 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">호스팅 지역</h1>
          <div className="mt-4 rounded-lg p-5 border border-gray-300">
            지도가 들어갑니다
          </div>
        </div>
      </div>
      <BookingSection room={room} />
    </div>
  );
}
