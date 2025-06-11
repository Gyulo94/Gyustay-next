/* eslint-disable @next/next/no-img-element */
"use client";

import { imageUpload } from "@/actions/file.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/constants/categories";
import { ROOM_FEATURE } from "@/constants/common";
import { useUpdateRoom } from "@/hooks/query/use-room";
import { cn } from "@/lib/utils";
import { RoomFeatureFormType, RoomFormType, RoomType } from "@/type/room.type";
import { RoomFormSchema } from "@/validation/room.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { toast } from "sonner";

export default function RoomEditForm({ room }: { room: RoomType }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>(
    room.images
      ? room.images.map((img) => (typeof img === "string" ? img : img.url))
      : []
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const updateRoom = useUpdateRoom(room.id);

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
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
        // console.log("data", data);
        newImages.push(data);
      }
      setImages((prev) => [...prev, ...newImages]);
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 6,
  });

  const form = useForm<RoomFormType>({
    resolver: zodResolver(RoomFormSchema),
    defaultValues: {
      title: room.title || "",
      categoryId: room.categoryId || "",
      price: room.price || 0,
      bedroomDescription: room.bedroomDescription || "",
      address: room.address || "",
      freeCancel: room.freeCancel || false,
      selfCheckIn: room.selfCheckIn || false,
      officeSpace: room.officeSpace || false,
      hasMountainsView: room.hasMountainsView || false,
      hasShampoo: room.hasShampoo || false,
      hasFreeLaundry: room.hasFreeLaundry || false,
      hasAirConditioner: room.hasAirConditioner || false,
      hasWifi: room.hasWifi || false,
      hasBarbeque: room.hasBarbeque || false,
      hasFreeParking: room.hasFreeParking || false,
      images: images || [],
      description: room.description || "",
      lat: room.lat || "",
      lng: room.lng || "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleComplete(data: any) {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    form.setValue("address", fullAddress);
    setIsOpen(false);
  }

  function onSubmit(data: RoomFormType) {
    const values = {
      ...data,
      images: images,
    };
    console.log("Submitted values:", values);

    updateRoom.mutate(values);
  }

  console.log("form errors", form.formState.errors);

  return (
    <Form {...form}>
      <form
        className="px-4 md:max-w-4xl mx-auto py-8 my-20 flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          숙소 수정하기
        </h1>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  숙소 이름
                </FormLabel>
                <FormControl>
                  <Input className="border-2 border-purple-300" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  카테고리
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="outline-none px-4 py-2 rounded-lg border-2 border-purple-300 w-full">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  숙소 가격
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    className="border-2 border-purple-300"
                    value={
                      field.value === undefined || field.value === null
                        ? ""
                        : Number(field.value).toLocaleString()
                    }
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(raw === "" ? "" : Number(raw));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  숙소 설명
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-2 border-purple-300 resize-none h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="bedroomDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  객실 설명
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-2 border-purple-300 resize-none h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-3">
            {ROOM_FEATURE.map((feature) => (
              <FormField
                key={feature.value}
                control={form.control}
                name={feature.value as keyof RoomFeatureFormType}
                render={({ field }) => (
                  <label
                    className={cn(
                      "rounded-md hover:bg-purple-50 px-6 py-4 flex flex-col gap-2 cursor-pointer text-xs md:text-lg text-center",
                      {
                        "border-2 border-primary": !!field.value,
                        "border-2 border-purple-300": !field.value,
                      }
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="hidden"
                    />
                    <div className="flex justify-center">
                      <feature.icon className="text-lg md:text-2xl" />
                    </div>
                    {feature.label}
                  </label>
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            숙소의 위치를 입력해주세요
          </h1>
          <div className="max-w-xl w-full mx-auto flex flex-col gap-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    숙소 주소
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        className="border-2 border-purple-300"
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={() => setIsOpen((p) => !p)}
                      >
                        주소 검색
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isOpen && (
            <div
              className={cn(
                "max-w-xl mx-auto w-full rounded-lg overflow-hidden",
                {
                  border: isOpen,
                }
              )}
            >
              <DaumPostcodeEmbed
                style={{ width: "100%", height: "450px" }}
                onComplete={handleComplete}
              />
            </div>
          )}
        </div>
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
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="font-semibold leading-6 text-gray-900"
          >
            뒤로가기
          </button>
          <Button type="submit" disabled={isSubmitting}>
            수정하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
