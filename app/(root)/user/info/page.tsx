import { getMe } from "@/actions/user.actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserType } from "@/type/user.type";
import Link from "next/link";

export default async function UserInfoPage() {
  const user: UserType = await getMe();

  return (
    <div className="mt-10 max-w-3xl h-[77vh] md:h-[80vh] mx-auto px-4 md:pt-15">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-semibold">유저 정보</h1>
        <Link href={"/user/edit"}>
          <Button>수정하기</Button>
        </Link>
      </div>
      <div className="flex flex-col mt-10 mb-28">
        <div className="flex justify-center items-center">
          <Avatar className="size-32 object-cover object-center shadow">
            <AvatarImage src={user.image || "/images/noProfileImage.jpg"} />
          </Avatar>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">이름</h1>
          <div className="text-gray-500 text-sm">{user.name}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">이메일</h1>
          <div className="text-gray-500 text-sm">{user.email}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">유저 설명</h1>
          <div className="text-gray-500 text-sm">{user.description ?? "-"}</div>
        </div>
        <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
          <h1 className="font-semibold">계정 유형</h1>
          <div className="text-gray-500 text-sm">{user.provider ?? "-"}</div>
        </div>
      </div>
    </div>
  );
}
