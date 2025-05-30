"use client";

import { AiOutlineStar } from "react-icons/ai";
import { BiSolidTree, BiWater } from "react-icons/bi";
import { FaHouseUser, FaUmbrellaBeach } from "react-icons/fa";
import {
  GiBarn,
  GiCampingTent,
  GiCaveEntrance,
  GiHolyOak,
  GiSkier,
  GiStarKey,
} from "react-icons/gi";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { MdOutlineBedroomChild, MdOutlineSurfing } from "react-icons/md";
import { TbMoodKid, TbSwimming } from "react-icons/tb";

export const categories = [
  {
    id: "ae727717-9ef0-4fac-a975-a054fca9f332",
    label: "전망좋은",
    icon: IoPartlySunnyOutline,
  },
  {
    id: "92562245-ae62-434c-96a5-1cd04a888d09",
    label: "자연",
    icon: GiHolyOak,
  },
  {
    id: "e296b521-592c-4efd-b9de-83bfd05c8d9a",
    label: "동굴",
    icon: GiCaveEntrance,
  },
  {
    id: "c73547d3-b3ac-46c4-854a-96de684745f6",
    label: "캠핑장",
    icon: GiCampingTent,
  },
  {
    id: "976935bc-b669-46ea-891f-540b2f698ffc",
    label: "방",
    icon: MdOutlineBedroomChild,
  },
  {
    id: "b8572058-1090-403c-99b8-75db89731d75",
    label: "한옥",
    icon: FaHouseUser,
  },
  {
    id: "aebb81ab-75ee-404e-9a9d-e572ced3650b",
    label: "해변",
    icon: FaUmbrellaBeach,
  },
  {
    id: "b45a3343-369c-422a-86d0-dcaf5e19b1de",
    label: "국립공원",
    icon: BiSolidTree,
  },
  {
    id: "3ee83f18-62b2-4259-a9b7-81cdf706cdc2",
    label: "인기",
    icon: AiOutlineStar,
  },
  {
    id: "65c163ee-e050-437f-8b89-12bfd293770c",
    label: "수영장",
    icon: TbSwimming,
  },
  {
    id: "76d51cc6-fdad-42d6-b02d-ee41fb31ddf9",
    label: "농장",
    icon: GiBarn,
  },
  {
    id: "0d18f052-bf4f-4ea7-b74f-514592a03091",
    label: "스키",
    icon: GiSkier,
  },
  {
    id: "1c56d6c3-042d-4be2-ad00-6322fb492b74",
    label: "호수",
    icon: BiWater,
  },
  {
    id: "64f59963-f33b-4fd1-93ed-29916141a6bc",
    label: "키즈",
    icon: TbMoodKid,
  },
  {
    id: "00c5f54f-54bd-478a-8658-452b7a7cb2f0",
    label: "신규",
    icon: GiStarKey,
  },
  {
    id: "3993db1a-2c36-485c-8c2e-aed2e9f7c9a0",
    label: "서핑",
    icon: MdOutlineSurfing,
  },
];
