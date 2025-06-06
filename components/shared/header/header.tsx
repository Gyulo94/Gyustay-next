"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { useState } from "react";
import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

export default function Header({ session }: { session: Session | null }) {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <>
      <header className="sticky top-0 w-full bg-white z-10 shadow-sm">
        <div
          className={cn("py-4 border-b-[1px]", {
            "border-none": showFilter,
            "!h-44": showFilter,
          })}
        >
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <Search setShowFilter={setShowFilter} showFilter={showFilter} />
              <UserMenu session={session} />
            </div>
          </Container>
        </div>
      </header>
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/20 z-[5]"
          onClick={() => setShowFilter(false)}
        />
      )}
    </>
  );
}
