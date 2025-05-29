"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";

export default function UserMenu() {
  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          호스팅 하기
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              onClick={() => {}}
              className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
              <AiOutlineMenu className="cursor-pointer" />

              <Avatar>
                <AvatarImage src={"/images/noProfileImage.jpg"} alt="profile" />
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col">
              <DropdownMenuItem onClick={() => router.push("/login")}>
                로그인
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/signup")}>
                회원가입
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
