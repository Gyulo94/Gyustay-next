import { imageUpload } from "@/actions/file.actions";
import { useRoomFormStore } from "@/hooks/store";
import { RoomFormType } from "@/type/room.type";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillCamera } from "react-icons/ai";
import { toast } from "sonner";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  defaultImages?: string[];
  onSubmit: (roomForm: RoomFormType) => void;
}

export default function RoomOpenImage({ defaultImages, onSubmit }: Props) {
  const { roomForm, setRoomForm, setStep } = useRoomFormStore();
  const [images, setImages] = useState<string[]>([]);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > 6) {
        toast.error("이미지는 최대 6장까지 업로드할 수 있습니다.");
        return;
      }

      const newImages: string[] = [];
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        const data = await imageUpload(formData);
        console.log("data", data);
        newImages.push(data);
      }
      setImages((prev) => [...prev, ...newImages]);
      setRoomForm({
        ...roomForm,
        images: [...images, ...newImages],
      });
    },
    [images]
  );
  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (
      defaultImages &&
      Array.isArray(defaultImages) &&
      defaultImages.length > 0 &&
      images.length === 0
    ) {
      const urls = defaultImages.map((img) => img);
      setImages(urls);
      setRoomForm({
        ...roomForm,
        images: urls,
      });
    }
  }, [defaultImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 6,
  });

  function handleSubmit() {
    if (images.length < 1) {
      toast.error("최소 1장의 사진을 업로드해야 합니다.");
      return;
    }
    onSubmit(roomForm);
  }
  return (
    <>
      <Stepper count={5} />
      <div className="mt-10 flex flex-col gap-6 px-4">
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소의 사진을 추가해주세요
        </h1>
        <p className="text-sm md:text-base text-gray-500 text-center">
          숙소 사진은 최대 6장까지 추가할 수 있습니다.
        </p>
        <div className="flex flex-col gap-2">
          <div className="col-span-full">
            {images.length < 6 ? (
              <label
                htmlFor="file-upload"
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer"
                {...getRootProps()}
              >
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  {...getInputProps()}
                />
                {!isDragActive ? (
                  <div className="text-center">
                    <AiFillCamera className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <div className="relative rounded-md bg-white font-semibold text-primary">
                        <span>최대 6장의 사진을</span>
                      </div>
                      <p className="pl-1">업로드 해주세요</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      이미지 선택 및 드래그 앤 드롭 (복수 선택 가능)
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <AiFillCamera className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <p className="text-center">파일을 내려놓으세요.</p>
                    </div>
                  </div>
                )}
              </label>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-10 max-w-lg mx-auto flex flex-wrap gap-4">
        {images &&
          images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="미리보기"
              width={150}
              height={100}
              className="rounded-md cursor-pointer"
              onClick={() => handleImageRemove(index)}
            />
          ))}
      </div>
      <ButtonWrap
        prevOnClick={() => setStep(4)}
        nextDisabled={images.length < 1}
        nextText="완료"
        nextOnClick={handleSubmit}
      />
    </>
  );
}
