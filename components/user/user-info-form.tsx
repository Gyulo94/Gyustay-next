"use client";

import { imageUpload } from "@/actions/file.actions";
import { useEditUser } from "@/hooks/query/use-user";
import { UserInfoFormType, UserType } from "@/type/user.type";
import { userInfoFormSchema } from "@/validation/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddAPhoto } from "react-icons/md";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function UserInfoForm({ user }: { user: UserType }) {
  const { update } = useSession();
  const router = useRouter();
  const [image, setImage] = useState<string>(user.image || "");
  const form = useForm<UserInfoFormType>({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues: {
      name: user.name,
      image: user.image || "",
      description: user.description || "",
    },
  });

  const editUser = useEditUser();

  const onSubmit = (values: UserInfoFormType) => {
    editUser.mutate(values, {
      onSuccess: (data) => {
        const updatedData = {
          user: {
            name: data.body.name,
            description: data.body.description,
            image: data.body.image,
          },
        };
        void update(updatedData);
        router.push("/user/mypage");
      },
    });
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      const data = await imageUpload(formData);
      form.setValue("image", data || "");
      setImage(data);
    }
  };

  const handleImageRemove = () => {
    setImage("");
    form.setValue("image", "");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="gap-4 flex items-center justify-center">
              <div className="relative overflow-hidden size-[150px] rounded-full">
                {image ? (
                  <Image
                    src={image}
                    alt={`Profile`}
                    fill
                    className="object-cover cursor-pointer"
                    onClick={handleImageRemove}
                  />
                ) : (
                  <Label
                    id="image"
                    className="cursor-pointer gap-4 border flex justify-center items-center overflow-hidden size-[150px] rounded-full"
                  >
                    <div className="text-center">
                      <MdAddAPhoto className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <span>클릭하여 업로드</span>
                        <input
                          type="file"
                          id={"image"}
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImagesChange}
                        />
                      </div>
                    </div>
                  </Label>
                )}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="이름" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>유저 설명</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="유저 설명"
                      className="resize-none h-36"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button>수정하기</Button>
        </div>
      </form>
    </Form>
  );
}
