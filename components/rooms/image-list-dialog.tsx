import { BLUR_DATA_URL } from "@/constants/common";
import { useImageListDialogStore } from "@/hooks/store/modal.stroe";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function ImageListDialog() {
  const { isOpen, onClose, images } = useImageListDialogStore();
  console.log("ImageListDialog images:", images);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-mediom text-center leading-6 text-gray-900">
            이미지 전체 보기
          </DialogTitle>
        </DialogHeader>
        <div className="mt-10 mb-20 max-w-xl mx-auto flex flex-col gap-4">
          {images.map((img) => (
            <Image
              key={img.url}
              src={img.url}
              alt="room image"
              width={1000}
              height={1000}
              className="mx-auto"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
