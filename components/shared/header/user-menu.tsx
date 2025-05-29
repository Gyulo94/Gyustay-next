"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOpenRentStore } from "@/hooks/store/open.store";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";

export default function UserMenu({ session }: { session: Session | null }) {
  const { onOpen } = useOpenRentStore();
  const publicRoute = [
    {
      label: "로그인",
      href: "/login",
    },
    {
      label: "회원가입",
      href: "/signup",
    },
  ];

  const privateRoute = [
    {
      label: "나의 여행",
      href: "/trips",
    },
    {
      label: "나의 예약",
      href: "/reservations",
    },
    {
      label: "내의 숙소",
      href: "/properties",
    },
    {
      label: "나의 즐겨찾기",
      href: "/favorites",
    },
    {
      label: "호스팅 하기",
      href: "/hosting",
    },
  ];
  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onOpen}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          호스팅 하기
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <AiOutlineMenu className="cursor-pointer sm:ml-2" />

              {session?.user ? (
                <Avatar>
                  <AvatarImage
                    src={
                      session.user.image
                        ? session.user.image
                        : "/images/noProfileImage.jpg"
                    }
                    alt="profile"
                  />
                </Avatar>
              ) : (
                <div className="p-0 sm:p-1.5">
                  <LuUserRound className="size-5" />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {session?.user ? (
              <div className="flex flex-col">
                {privateRoute.map((item) => (
                  <DropdownMenuItem
                    onClick={() => router.push(item.href)}
                    key={item.label}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={async () => await signOut()}>
                  로그아웃
                </DropdownMenuItem>
              </div>
            ) : (
              <div className="flex flex-col">
                {publicRoute.map((item) => (
                  <DropdownMenuItem
                    onClick={() => router.push(item.href)}
                    key={item.label}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
