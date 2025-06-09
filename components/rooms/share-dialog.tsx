"use client";

import { BLUR_DATA_URL } from "@/constants/common";
import { useShareDialogStore } from "@/hooks/store/modal.store";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiOutlineCopy,
  AiOutlineMail,
} from "react-icons/ai";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function ShareDialog() {
  const { isOpen, onClose, image, title, address, category } =
    useShareDialogStore();

  const handleCopyLink = () => {
    if (navigator.clipboard && window) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("링크가 복사되었습니다!"))
        .catch(() =>
          toast.error("링크 복사에 실패했습니다. 다시 시도해주세요.")
        );
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://www.twitter.com/intent/tweet?url=${window.location.href}`,
        "_blank"
      );
    }
  };
  const handleShareFacebook = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        "_blank"
      );
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-mediom leading-6 text-gray-900">
            숙소 공유하기
          </DialogTitle>
        </DialogHeader>
        <div className="mt-5 flex justify-between items-center gap-4 md:px-5">
          <Image
            src={image}
            alt="room image"
            width={60}
            height={60}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="rounded-md"
          />
          <div className="flex flex-col items-start text-sm gap-1">
            <div className="flex gap-1 items-center">
              <div className="text-gray-800">{title}</div>
              <span className="text-gray-600">·</span>
              <div className="text-gray-800">{category}</div>
            </div>
            <div className="text-gray-800">{address}</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <button
            type="button"
            onClick={handleCopyLink}
            className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-black/5"
          >
            <AiOutlineCopy className="text-xl md:text-3xl" />
            링크 복사
          </button>
          {typeof window !== "undefined" && (
            <Link
              href={`mailto:?subject=GyuStay 숙소 공유하기&body=${window.location.href}`}
              className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-black/5"
            >
              <AiOutlineMail className="text-xl md:text-3xl" />
              이메일
            </Link>
          )}
          <button
            type="button"
            onClick={handleShareTwitter}
            className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-black/5"
          >
            <AiFillTwitterSquare className="text-xl md:text-3xl text-sky-500" />
            트위터
          </button>
          <button
            type="button"
            onClick={handleShareFacebook}
            className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-black/5"
          >
            <AiFillFacebook className="text-xl md:text-3xl text-blue-600" />
            페이스북
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
