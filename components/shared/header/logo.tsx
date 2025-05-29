"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src={"/logo/logo.png"}
      alt="Logo"
      height={100}
      width={100}
      className="hidden md:block cursor-pointer"
    />
  );
}
