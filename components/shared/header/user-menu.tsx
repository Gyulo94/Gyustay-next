"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";

export default function UserMenu({ session }: { session: Session | null }) {
  // console.log("isOpen:", isOpen);

  const { status } = useSession();
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
      label: "마이페이지",
      href: "/user/mypage",
    },
    {
      label: "로그아웃",
      href: "#",
      signOut: true,
    },
  ];
  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {status === "authenticated" ? (
          <Link
            href={"/rooms/register/category"}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            당신의 공간을 등록해주세요
          </Link>
        ) : (
          <Link
            href={"/login"}
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          >
            로그인 후 공간을 등록해주세요
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <AiOutlineMenu className="cursor-pointer sm:ml-2" />

              {session?.user ? (
                <div className="relative overflow-hidden size-[32px] rounded-full">
                  <Image
                    src={
                      session.user.image
                        ? session.user.image
                        : "/images/noProfileImage.jpg"
                    }
                    alt={`Profile`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
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
                    onClick={() => {
                      router.push(item.href);
                      if (item.signOut) signOut();
                    }}
                    key={item.label}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
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
