"use client";

import { categories } from "@/constants/categories";
import { usePathname, useSearchParams } from "next/navigation";
import Container from "../shared/container";
import CategoryBox from "./category-box";

export default function Categories() {
  const params = useSearchParams();
  const category = params.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={item.label === category}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}
