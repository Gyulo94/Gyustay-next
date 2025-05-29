"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../container";
import CategoryBox from "./category-box";

export const categories = [
  {
    label: "해변",
    icon: TbBeach,
    description: "바다와 모래사장이 있는 아름다운 해변이 있는 곳",
  },
  {
    label: "풍차",
    icon: GiWindmill,
    description: "로맨틱하고 이국적인 풍차가 있는 곳",
  },
  {
    label: "모던",
    icon: MdOutlineVilla,
    description: "현대적이고 세련된 빌라가 있는 곳",
  },
  {
    label: "시골",
    icon: TbMountain,
    description: "조용하고 평화로운 시골",
  },
  {
    label: "수영",
    icon: TbPool,
    description: "수영장이 있는 멋진 숙소",
  },
  {
    label: "섬",
    icon: GiIsland,
    description: "아름다운 섬에서의 휴식과 탐험할 수 있는 곳",
  },
  {
    label: "호수",
    icon: GiBoatFishing,
    description: "호수 근처에서의 낚시와 수상 스포츠를 즐길 수 있는 곳",
  },
  {
    label: "스키",
    icon: FaSkiing,
    description: "눈 덮인 산에서의 스키와 스노보드를 즐길 수 있는 곳",
  },
  {
    label: "캠핑",
    icon: GiForestCamp,
    description: "자연 속에서의 캠핑과 야외 활동을 즐길 수 있는 곳",
  },
  {
    label: "북극",
    icon: BsSnow,
    description: "눈 덮인 북극 지역에서의 독특한 경험을 제공하는 곳",
  },
  {
    label: "동굴",
    icon: GiCaveEntrance,
    description: "신비로운 동굴 탐험을 할 수 있는 곳",
  },
  {
    label: "사막",
    icon: GiCactus,
    description: "광활한 사막에서의 모험과 탐험을 즐길 수 있는 곳",
  },
  {
    label: "헛간",
    icon: GiBarn,
    description: "전통적인 농장 스타일의 헛간에서의 숙박 경험을 제공하는 곳",
  },
  {
    label: "고급",
    icon: IoDiamond,
    description: "최고급 시설과 서비스를 제공하는 럭셔리 숙소",
  },
];

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
